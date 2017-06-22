const assert = require('assert');
const bot = require('../discord_bot.js');
const config = require('../config.json');

var defaultSpaceSplit = config.message.spaceSplit;
var defaultCharSplit = config.message.charSplit;

describe('parseMessage(msg)', function() {
  it('should set redAFlag when message contains -a', function() {
    // arrange
    var message = '!emoji -a TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.redAFlag, true);
  });

  it('should set redBFlag when message contains -b', function() {
    // arrange
    var message = '!emoji -b TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.redBFlag, true);
  });

  it('should set the space delimiter when message contains -s <string>', function() {
    // arrange
    var message = '!emoji -s spaceDelim TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.spaceSplitString, 'spaceDelim');
  });

  it('should set character delimiter when message contains -c <string>', function() {
    // arrange
    var message = '!emoji -c charDelim TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.charSplitString, 'charDelim');
  });

  it('should set everything when message contains all modifiers', function() {
    // arrange
    var message = '!emoji -a -b -s spaceDelim -c charDelim TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.redAFlag, true);
    assert.equal(request.redBFlag, true);
    assert.equal(request.spaceSplitString, 'spaceDelim');
    assert.equal(request.charSplitString, 'charDelim');
  });

  it('should parse the message when no modifiers are provided', function() {
    // arrange
    var message = '!emoji TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.message, 'TestMessage');
  });

  it('should parse the message when the last modifier is -a', function() {
    // arrange
    var message = '!emoji -s test -a TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.message, 'TestMessage');
  });

  it('should parse the message when the last modifier is -b', function() {
    // arrange
    var message = '!emoji -a -s test -b TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.message, 'TestMessage');
  });

  it('should parse the message when the last modifier is -s <string>', function() {
    // arrange
    var message = '!emoji -a -b -s test TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.message, 'TestMessage');
  });

  it('should parse the message when the last modifier is -c <string>', function() {
    // arrange
    var message = '!emoji -b -c test TestMessage';
    // act
    var request = bot.parseMessage(message);
    // assert
    assert.equal(request.message, 'TestMessage');
  });
});

describe('emojifyMessage(msg)', function() {
  it('should turn the message into the correct emojied form', function() {
    // arrange
    var req = getTestMessage();
    // act
    var emojifiedMessage = bot.emojifyMessage(req);
    // assert
    assert.equal(emojifiedMessage, ':regional_indicator_a::regional_indicator_b::regional_indicator_c:' + defaultSpaceSplit + ':one::two::three:');
  });

  it('should turn the message with -a modifier into the correct emojied form', function() {
    // arrange
    var req = getTestMessage();
    req.redAFlag = true;
    // act
    var emojifiedMessage = bot.emojifyMessage(req);
    // assert
    assert.equal(emojifiedMessage, ':a::regional_indicator_b::regional_indicator_c:' + defaultSpaceSplit + ':one::two::three:');
  });

  it('should turn the message with -b modifier into the correct emojied form', function() {
    // arrange
    var req = getTestMessage();
    req.redBFlag = true;
    // act
    var emojifiedMessage = bot.emojifyMessage(req);
    // assert
    assert.equal(emojifiedMessage, ':regional_indicator_a::b::regional_indicator_c:' + defaultSpaceSplit + ':one::two::three:');
  });
});

function getTestMessage() {
  return {
    message: 'abc 123',
    redAFlag: config.message.redAFlag,
    redBFlag: config.message.redBFlag,
    spaceSplitString: defaultSpaceSplit,
    charSplitString: defaultCharSplit
  };
}
