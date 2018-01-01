const fs = require('fs');
const readline = require('readline');

let configObj = JSON.parse(fs.readFileSync('config.json').toString());

console.log('-- Setup for config values for the BasementBot --');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your bot token: ', (tk) => {
    configObj.discord.token = tk;
    
rl.question('Enter your main text channel (defualt \'general\'): ', (ch) => {
    configObj.discord.mainChannel = ch === '' ? 'general' : ch;
        
rl.question('Enter your timezone offset (default 0): ', (tz) => {
    configObj.discord.timezoneOffset = tz === '' ? 0 : tz;
    rl.close();

    fs.writeFile('config.json', JSON.stringify(configObj), err => { 
        if(err) throw err;
        console.log(''); 
        console.log('Setup complete!');
        console.log('Run the bot using \'forever BasementBot.js\''); 
    });
});
});
});






