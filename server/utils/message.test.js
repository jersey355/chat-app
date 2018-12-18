const expect = require('expect');
const { makeMessage, makeLocMessage } = require('./message');

describe('makeMessage', () => {
    it('Should generate the correct message object', () => {
        var from = 'bob';
        var text = 'hello';
        var msg = makeMessage(from, text);
        expect(typeof msg.created).toBe('number');
        expect(msg).toMatchObject({ from, text });
    });
});

describe('makeLocMessage', () => {
    it('Should generate the correct location message object', () => {
        var from = 'bob';
        var latitude = 28;
        var longitude = -81;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var msg = makeLocMessage(from, latitude, longitude);
        expect(typeof msg.created).toBe('number');
        expect(msg).toMatchObject({ from, url });
    });
});