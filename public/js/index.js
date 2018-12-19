var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function (message) {
    console.log('newMessage >> ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#msg-list').append(li);
});

socket.on('newLocMessage', function (message) {
    console.log('newMessage >> ', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#msg-list').append(li);
});

jQuery('#msg-form').on('submit', function (e) {
    e.preventDefault();
    var msgTextBox = '[name=msg]';
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery(msgTextBox).val()
    }, function (data) {
        jQuery(msgTextBox).val('');
    });
});

// add handler for send location button
var locationButton = jQuery('#send-loc');
locationButton.on('click', function () {

    // handle case where browser does not support geolocation
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    // do something with the location coordinates
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!');
    });

});