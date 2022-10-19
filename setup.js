const fs = require("fs");
const { resolve } = require("path");
const readline = require("readline");

let configObj = JSON.parse(fs.readFileSync("config.json.example").toString());

console.log("-- Setup for config values for the BasementBot --");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const buildConfigFile = async () => {
  await new Promise((res) =>
    rl.question("Enter your bot token: ", (token) => {
      configObj.discord.token = token;
      res();
    })
  );

  await new Promise((res) =>
    rl.question(
      "Enter your main text channel (default 'general'): ",
      (defaultChannel) => {
        configObj.discord.mainChannel =
          defaultChannel === "" ? "general" : defaultChannel;
        res();
      }
    )
  );

  await new Promise((res) =>
    rl.question("Enter your GeoGuessr key: ", (geoKey) => {
      if (geoKey) configObj.discord.geoGuessrKey = geoKey;
      res();
    })
  );

  rl.close();

  fs.writeFile("config.json", JSON.stringify(configObj), (err) => {
    if (err) throw err;
    console.log("");
    console.log("Setup complete!");
    console.log("Run the bot using 'node BasementBot.js'");
  });
};

buildConfigFile();
