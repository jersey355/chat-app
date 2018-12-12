const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { makeMessage } = require('./utils/message');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// allows you to serve static content
app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New client connected!');

    // send message to client
    socket.emit('newMessage', makeMessage('ADMIN', 'Welcome!'));

    // broadcast message to all other clients except self
    socket.broadcast.emit('newMessage', makeMessage('ADMIN', 'New user joined the chat room!'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', makeMessage(message.from, message.text));
        callback('createMessage ACK');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });
});

// start server
server.listen(port, () => {
    console.log(`Chat server listening on port ${port} ...`);
});