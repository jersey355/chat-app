const tsFormat = '(h:mm A)';
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.created).format(tsFormat);
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${message.from}: ${message.text}`);
    jQuery('#msg-list').append(li);
});

socket.on('newLocMessage', function (message) {
    var formattedTime = moment(message.created).format(tsFormat);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    li.text(`${formattedTime} ${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#msg-list').append(li);
});

jQuery('#msg-form').on('submit', function (e) {
    e.preventDefault();
    var msgTextBox = '[name=msg]';
    var msgText = jQuery(msgTextBox).val();
    if (msgText === '') return; // don't do anything if message is blank
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