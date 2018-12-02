const expect = require('expect');
const { makeMessage } = require('./message');

describe('makeMessage', () => {
    it('Should generate the correct message object', () => {
        var from = 'bob';
        var text = 'hello';
        var msg = makeMessage(from, text);
        expect(msg).toMatchObject({ from, text });
        expect(typeof msg.created).toBe('number');
    });
});