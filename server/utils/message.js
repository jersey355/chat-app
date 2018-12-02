var makeMessage = (from, text) => {
    return {
        from,
        text,
        created: new Date().getTime()
    };
}

module.exports = { makeMessage };