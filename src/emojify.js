const config = require('../config.json').emoji;

const redAModifier = '-a';
const redBModifier = '-b';
const spaceSplitModifier = '-s';
const charSplitModifier = '-c';
const numberMap = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

/*
 * Parses down message and returns an object which contains:
 * msg: message to be emojifieid
 * redAFlag: flag to use red A emoji over blue
 * redBFlag: flag to use red B emoji over blue
 * spaceSplitFlag: string used to split white space in message
 * charSplitFlag: string used to split characters in message
*/
function parseMessage(msg) {
    var msgArray = msg.toString().split(' '); // split message to be parsed
    var redAIndex = msgArray.indexOf(redAModifier);
    var redBIndex = msgArray.indexOf(redBModifier);
    var spaceModifierIndex = msgArray.indexOf(spaceSplitModifier);
    var charModifierIndex = msgArray.indexOf(charSplitModifier);

    var request = { // get defaults from config
        message: '',
        redAFlag: config.redAFlag,
        redBFlag: config.redBFlag,
        spaceSplitString: config.spaceSplit,
        charSplitString: config.charSplit
    };

    if (redAIndex > 0) {
        request.redAFlag = true;
    }
    if (redBIndex > 0) {
        request.redBFlag = true;
    }
    if (spaceModifierIndex > 0) {
        request.spaceSplitString = msgArray[spaceModifierIndex + 1];
    }
    if (charModifierIndex > 0) {
        request.charSplitString = msgArray[charModifierIndex + 1];
    }

    // finds where message begins by determining where the last modifier lives
    var messageStart;
    var maxSingleModifierIndex = Math.max(redAIndex, redBIndex);
    var maxArgumentedModifierIndex = Math.max(spaceModifierIndex, charModifierIndex)
    if (maxArgumentedModifierIndex > maxSingleModifierIndex) { // last argument was -space <string> or -char <string>
        messageStart = maxArgumentedModifierIndex + 2;
    }
    else if (maxSingleModifierIndex > maxArgumentedModifierIndex) { // last argument was -a or -b
        messageStart = maxSingleModifierIndex + 1;
    }
    else { // no arguments
        messageStart = 1;
    }
    request.message = msgArray.slice(messageStart).join(' ');

    return request;
}

/*
* Turns a message into it's emojified form with Discord emojis
* takes flags from parseMessage and handles special cases such as :a: and :b:
*/
function emojifyMessage(msgObj) {
    var emojifiedMessage = '';

    if (!/\s/.test(msgObj.spaceSplitString)) { // append spaceString at the beginning of message
        emojifiedMessage += msgObj.spaceSplitString;
    }

    var message = msgObj.message.toLowerCase().split('');
    for (var i = 0; i < message.length; i++) {
        var char = message[i];
        if (/\s/.test(char)) { // white space
            emojifiedMessage += msgObj.spaceSplitString;
        }
        else if (/\d/.test(char)) { // digit
            emojifiedMessage += ':' + numberMap[parseInt(char)] + ':';
        }
        else if (/\w/.test(char)) { // word character
            if (char == 'a' && msgObj.redAFlag) { // :a: case
                emojifiedMessage += ':a:';
            }
            else if (char == 'b' && msgObj.redBFlag) { //:b: case
                emojifiedMessage += ':b:';
            }
            else { // default letter case
                emojifiedMessage += ':regional_indicator_' + char + ':';
            }
        }
        else if(/\?/.test(char)) { // ?
            emojifiedMessage += ':question:'
        }
        else if(/\!/.test(char)) { // !
            emojifiedMessage += ':exclamation:'
        }
        else { // symbol and emoji case
            emojifiedMessage += char;
        }
        if (!/\s/.test(message[i]) && !/\s/.test(message[i+1]) && i+1 != message.length) { // add charSplitString between letters
            emojifiedMessage += msgObj.charSplitString;
        }
    }
    if (!/\s/.test(msgObj.spaceSplitString)) { // append spaceString at the end of message
        emojifiedMessage += msgObj.spaceSplitString;
    }
    return emojifiedMessage;
}

if (typeof exports !== 'undefined') {
    exports.parseMessage = parseMessage;
    exports.emojifyMessage = emojifyMessage;
}