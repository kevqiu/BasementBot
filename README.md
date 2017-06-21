# Text To Emoji Discord Bot
Discord chat bot that converts text into emojis.

Built on top of [discord.js](https://discord.js.org).

## Setup
Requirements - Node.js (version 6+)

1. Clone this repo
2. Run `npm install`
3. Create new app under `My Apps` on [Discord Developer Console](https://discordapp.com/developers/applications/me/)
4. Get Bot Token and add it to `config.json` (remove `.example` from file name)
5. Add bot to server with the following URL:
`https://discordapp.com/api/oauth2/authorize?client_id=<bot_client_id>&scope=bot`
6. Run the bot with `node discord_bot.js`

## Notes
* Give `Manage Messages` text permissions to allow it to delete the command calls.
* Default values are found in the `config.json` under `message`
