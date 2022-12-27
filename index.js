const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log("Drop box started on port ", server.address().port);
});