var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, function () {
    console.log("Drop box started on port ", server.address().port);
});
var message = "Testing TypeScript";
console.log(message);
