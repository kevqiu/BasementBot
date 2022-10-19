// Node dependencies
const config = require("./config.json");
const fs = require("fs");
const Discord = require("discord.js");
const colors = require("colors");

// command libraries
const emojify = require("./src/emojify.js");
const purge = require("./src/purge.js");

// constants
const toEmojiCommand = "!emoji";
const purgeCommand = "!purge";
const avatarCommand = "!avatar";
const helpCommand = "!help";
const geoCommand = "!geo";

// server tings
let mainChannel;
let helpText;

// locks
let helpLock = false;
let wednesdayLock = false;

//====================
// DISCORD BOT CLIENT
//====================
// Discord.js setup
const client = new Discord.Client();
const token = config.discord.token;

// Log into bot
client.login(token);

// bot initialization
client.on("ready", () => {
  console.log("Basement Bot ready!");
  fs.readFile(__dirname + "/help.txt", (err, data) => {
    helpText = data.toString();
    console.log("Help text loaded!");
  });
  // save channel defined in config
  mainChannel = client.channels.find((ch) => {
    return ch.name == config.discord.mainChannel;
  });
});

// loop every minute to check if it's Wednesday my dudes
// setInterval(() => wednesday(), 60 * 1000);

// bot message listener
client.on("message", (msg) => {
  if (client.user.username === msg.author.username) {
    // don't respond to own messages
    return;
  }
  if (msg.content.split(" ")[0] == toEmojiCommand) {
    // !emoji request
    toEmoji(msg);
  } else if (msg.content.split(" ")[0] == purgeCommand) {
    // !purge request
    purgeMessages(msg);
  } else if (msg.content.split(" ")[0] == avatarCommand) {
    // !avatar request
    avatar(msg);
  } else if (msg.content.split(" ")[0] == helpCommand) {
    // !help request
    help(msg);
  } else if (msg.content.split(" ")[0] == geoCommand) {
    // !geo request
    geo(msg);
  }
});

//=================================
// MESSAGE REQUEST HANDLER METHODS
//=================================
// !emoji request
function toEmoji(msg) {
  msg.delete().catch(function (err) {
    console.log("No delete permissions".red);
  });
  let request = emojify.parseMessage(msg);
  if (request.message && request.message.length > 0) {
    let textChannel = msg.channel;
    console.log(
      toEmojiCommand + " request sent from " + msg.author.username + ": " + msg
    );
    textChannel.send(msg.author.username + ":");
    textChannel.send(emojify.emojifyMessage(request));
  }
}

// !purge request
function purgeMessages(msg) {
  let request = purge.parseMessage(msg);
  let textChannel = msg.channel;
  if (request.amount < 2) {
    msg.delete();
  } else {
    textChannel.bulkDelete(request.amount);
  }
}

// !avatar request
function avatar(msg) {
  msg.reply(msg.author.avatarURL);
}

// !help request
function help(msg) {
  msg.delete().catch(function (err) {
    console.log("No delete permissions".red);
  });
  // only allows 1 !help call in defined time frame (value in config)
  if (!helpLock) {
    // lock the function
    helpLock = true;
    let textChannel = msg.channel;
    console.log(helpCommand + " request sent from " + msg.author.username);
    textChannel.send(helpText);
    // unlock after timer is up
    setTimeout(function () {
      helpLock = false;
    }, config.discord.helpTimer);
  }
}

// check if it's Wednesday and post the Wednesday frog if it is
function wednesday() {
  let day = new Date(
    new Date().getTime() + config.discord.timezoneOffset * 3600 * 1000
  ).toUTCString();
  // only allows 1 posting of the Wednesday frog every Wednesday
  if (day.includes("Wed") && !wednesdayLock && mainChannel) {
    wednesdayLock = true;
    mainChannel.send("", {
      file: __dirname + "/resources/wednesday.jpg",
    });
  } else if (!day.includes("Wed")) {
    // once Wednesday is over, prepare for next week
    wednesdayLock = false;
  }
}

const geo = (msg) => {
  msg.delete().catch(function (err) {
    console.log("No delete permissions".red);
  });
  let textChannel = msg.channel;
  console.log(geoCommand + " request sent from " + msg.author.username);
  textChannel.send("hello !geo");
};
