'use strict'

// Includes
const express = require('express');
const multer = require('multer');
const path = require('node:path');
const sanitizer = require('string-sanitizer');

const app = express();

// ExpressJS Setup
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer Setup
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = sanitizer.sanitize(file.mimetype.split('/')[1]);
        const submitter = sanitizer.sanitize(req.body.name);
        const filename = sanitizer.sanitize(file.filename);
        cb(null, `midis/${Date.now()}-${submitter}-${filename}.${ext}`);
    },
});
const multerFileFilter = (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (ext.startsWith("mid")) {
        console.log("filefilter: success")
        cb(null, true);
    }
    else {
        console.log("filefilter: fail")
        cb(null, false);
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFileFilter,
});
app.get('/', (req, res) => {
    res.status(200).render('index');
});
app.post('/upload_file', upload.single("file"), (req, res, next) => {
    console.log(req.body.name);
    console.log(req.file);
    try {
        res.status(200).json({ 
            status: "success",
            message: "Successfully uploaded MIDI file" 
        });
    } catch (e) {
        res.json({e,});
    }
});


process.on('uncaughtexception', (e) => {
    console.log("UNCAUGHT EXCEPTION, SHUTTING DOWN!!!");
    console.log(e.name, e.message);
    process.exit(1);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log('Drop box started on port ', server.address().port);
});