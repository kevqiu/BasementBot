const config = require('../config.json');
var defaultSpaceSplit = config.message.spaceSplit;
var defaultCharSplit = config.message.charSplit;

function getTestMessage(message) {
  if (message === '' || message === undefined) message = 'abc 123';
  return {
    message: message,
    redAFlag: config.message.redAFlag,
    redBFlag: config.message.redBFlag,
    spaceSplitString: defaultSpaceSplit,
    charSplitString: defaultCharSplit
  };
}

if (typeof exports !== 'undefined') {
   exports.getTestMessage = getTestMessage;
}
