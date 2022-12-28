'use strict'

// Includes
const express = require('express');
const path = require('node:path');

// Set up ExpressJS
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Set the static path
app.use('/static', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).render('index');
});
app.post('/', (req, res) => {
    res.send('got a post request!');
})

const server = app.listen(PORT, () => {
    console.log('Drop box started on port ', server.address().port);
});
