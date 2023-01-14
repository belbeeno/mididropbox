'use strict'

// Includes
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('node:path');
const serve = require('serve-index');

const app = express();

// ExpressJS Setup
app.use(express.json());
app.use(require('sanitize').middleware)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
//app.use('/midis', express.static('public/midis'), serve('public/midis', {'icons': true}));


// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer Setup
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/midis");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const submitter = req.body.name;
        console.log("FGSFDS");
        console.log(file);
        console.log(file.originalname);
        console.log(file.originalname.split('.')[0]);
        const filename = file.originalname.split('.')[0];
        cb(null, `${Date.now()}-${submitter}-${filename}.${ext}`);
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
app.get('/playlist', (req, res) => {
    var files = fs.readdirSync('public/midis', {withFileTypes: true});
    var midis = [];
    for (let i = 0; i < files.length; i++) {
        midis[i] = files[i].name
    }
    res.status(200).json({ midis });
})

process.on('uncaughtexception', (e) => {
    console.log("UNCAUGHT EXCEPTION, SHUTTING DOWN!!!");
    console.log(e.name, e.message);
    process.exit(1);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log('Drop box started on port ', server.address().port);
});