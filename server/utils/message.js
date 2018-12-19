const moment = require('moment');

var makeMessage = (from, text) => {
    return {
        from,
        text,
        created: moment().valueOf()
    };
}

var makeLocMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        created: moment().valueOf()
    };
}

module.exports = { makeMessage, makeLocMessage };