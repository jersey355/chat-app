var makeMessage = (from, text) => {
    return {
        from,
        text,
        created: new Date().getTime()
    };
}

var makeLocMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        created: new Date().getTime()
    };
}

module.exports = { makeMessage, makeLocMessage };