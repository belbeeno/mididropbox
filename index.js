'use strict';
// Includes
var express = require('express');
var multer = require('multer');
var path = require('node:path');
var sanitizer = require('string-sanitizer');
var app = express();
// ExpressJS Setup
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Multer Setup
var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        var ext = sanitizer.sanitize(file.mimetype.split('/')[1]);
        var submitter = sanitizer.sanitize(req.body.name);
        var filename = sanitizer.sanitize(file.filename);
        cb(null, "midis/".concat(Date.now(), "-").concat(submitter, "-").concat(filename, ".").concat(ext));
    },
});
var multerFileFilter = function (req, file, cb) {
    var ext = file.mimetype.split("/")[1];
    if (ext.startsWith("mid")) {
        console.log("filefilter: success");
        cb(null, true);
    }
    else {
        console.log("filefilter: fail");
        cb(null, false);
    }
};
var upload = multer({
    storage: multerStorage,
    fileFilter: multerFileFilter,
});
app.get('/', function (req, res) {
    res.status(200).render('index');
});
app.post('/upload_file', upload.single("file"), function (req, res, next) {
    console.log(req.body.name);
    console.log(req.file);
    try {
        res.status(200).json({
            status: "success",
            message: "Successfully uploaded MIDI file"
        });
    }
    catch (e) {
        res.json({ e: e, });
    }
});
process.on('uncaughtexception', function (e) {
    console.log("UNCAUGHT EXCEPTION, SHUTTING DOWN!!!");
    console.log(e.name, e.message);
    process.exit(1);
});
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, function () {
    console.log('Drop box started on port ', server.address().port);
});
