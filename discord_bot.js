var Discord = require('discord.js');
var client = new Discord.Client();
var token = '';

var toEmojiCommand = /!toEmoji/;
var redAModifier = /-a/;
var redBModifier = /-b/;
var spaceSplitModifier = /-space/;
var charSplitModifier = /-char/;

client.login(token);

client.on('ready', () => {
  console.log('Text to Discord Bot ready!');
});

client.on('message', message => {
  if (toEmojiCommand.test(message.content)) {
    var flags = getFlags(message);
    console.log("Request sent from " + message.author.username + ": " + message)
    message.reply(flags.redA);
    message.reply(flags.redB);
    message.reply(flags.spaceSplit);
    message.reply(flags.charSplit);
  }
});

function getFlags(msg) {
  var flags = {
    redA : false,
    redB : false,
    spaceSplit : '',
    charSplit : ''
  };

  if(redAModifier.test(msg)) {
    flags.redA = true;
  }
  if(redBModifier.test(msg)) {
    flags.redB = true;
  }
  if(spaceSplitModifier.test(msg)) {
    var msgArray = msg.toString().split(' ');
    flags.spaceSplit = msgArray[msgArray.indexOf('-space') + 1];
  }
  if(charSplitModifier.test(msg)) {
    var msgArray = msg.toString().split(' ');
    flags.charSplit = msgArray[msgArray.indexOf('-char') + 1];
  }

  return flags;
}