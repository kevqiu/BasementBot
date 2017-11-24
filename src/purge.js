const config = require('../config.json').purge;

function parseMessage(msg) {
    var msgArray = msg.toString().split(' '); // split message to be parsed
    
    return {
        amount: Math.min(config.limit, msgArray.length > 1 ? parseInt(msgArray[1]) + 1 : 2)
    };
}

if (typeof exports !== 'undefined') {
    exports.parseMessage = parseMessage;
}