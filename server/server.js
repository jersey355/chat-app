const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();

// allows you to serve static content
app.use(express.static(publicPath));

// start server
app.listen(port, () => {
    console.log(`Chat server listening on port ${port} ...`);
});