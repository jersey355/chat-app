const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// allows you to serve static content
app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New client connected!');

    socket.emit('newMessage', {
        from: 'ADMIN',
        text: 'Welcome!'
    });

    socket.broadcast.emit('newMessage', {
        from: 'ADMIN',
        text: 'New user joined the chat room!'
    });

    socket.on('createMessage', (message) => {
        message.created = new Date().toDateString();
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created: new Date().toDateString()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     created: new Date().toDateString()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });
});

// start server
server.listen(port, () => {
    console.log(`Chat server listening on port ${port} ...`);
});