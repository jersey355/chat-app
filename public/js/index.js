var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function (email) {
    console.log('newMessage >> ', email);
    var li = jQuery('<li></li>');
    li.text(`${email.from}: ${email.text}`);
    jQuery('#msg-list').append(li);
});

jQuery('#msg-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=msg]').val()
    }, function (data) {

    });
});