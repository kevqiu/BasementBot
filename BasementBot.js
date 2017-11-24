// Node dependencies
const config = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const colors = require('colors');

// commamd libraries
const emojify = require('./src/emojify.js');
const purge = require('./src/purge.js');

// constants
const toEmojiCommand = '!emoji';
const purgeCommand = '!purge';
const helpCommand = '!help';

var helpText;
var helpLock = false;

//====================
// DISCORD BOT CLIENT
//====================
// Discord.js setup
const client = new Discord.Client();
const token = config.discord.token;

// Log into bot
client.login(token);

// bot initialization
client.on('ready', () => {
    console.log('Basement Bot ready!');
    fs.readFile(__dirname + '/help.txt', (err, data) => {
        helpText = data.toString();
        console.log('Help text loaded!');
    });
});

// bot message lisener
client.on('message', msg => {
    if (client.user.username === msg.author.username) { // don't respond to own messages
        return;
    }
    if (msg.content.split(' ')[0] == toEmojiCommand) { // !emoji request
        toEmoji(msg);
    }
    else if (msg.content.split(' ')[0] == purgeCommand) { // !help request
        purgeMessages(msg);
    }
    else if (msg.content.split(' ')[0] == helpCommand) { // !help request
        help(msg);
    }
});

//=================================
// MESSAGE REQUEST HANDLER METHODS
//=================================
// !emoji request
function toEmoji(msg) {
    msg.delete().catch(function (err) {
        console.log('No delete permissions'.red);
    });
    var request = emojify.parseMessage(msg);
    if (request.message && request.message.length > 0) {
        var textChannel = msg.channel;
        console.log(toEmojiCommand + ' request sent from ' + msg.author.username + ': ' + msg)
        textChannel.send(msg.author.username + ':');
        textChannel.send(emojify.emojifyMessage(request));
    }
}

// !purge request
function purgeMessages(msg) {
    var request = purge.parseMessage(msg);
    var textChannel = msg.channel;    
    if (request.amount < 2) {
        msg.delete();
    }
    else {
        textChannel.bulkDelete(request.amount);
    }
}

// !help request
function help(msg) {
    msg.delete().catch(function (err) {
        console.log('No delete permissions'.red);
    });
    if(!helpLock) {    // only allows 1 !help call in defined time frame (value in config)
        helpLock = true; // lock the function
        var textChannel = msg.channel;
        console.log(helpCommand + ' request sent from ' + msg.author.username);
        textChannel.send(helpText);
        setTimeout(function() {helpLock = false}, config.discord.helpTimer) // unlock after timer is up
    }
}
