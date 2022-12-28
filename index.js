'use strict';
// Includes
var express = require('express');
var path = require('node:path');
// Set up ExpressJS
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Set the static path
app.use('/static', express.static(path.join(__dirname, 'public')));
var PORT = process.env.PORT || 5000;
app.get('/', function (req, res) {
    res.status(200).render('index');
});
app.post('/', function (req, res) {
    res.send('got a post request!');
});
var server = app.listen(PORT, function () {
    console.log('Drop box started on port ', server.address().port);
});
