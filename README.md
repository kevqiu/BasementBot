# Text To Emoji Discord Bot
Discord chat bot that converts text into emojis.

Built on top of [discord.js](https://discord.js.org).

## Commands
```diff
!emoji <modifiers> <message>
  Turns your text into emojis
  Modifiers:
    • -a : uses red A instead of blue A
    • -b : uses red B instead of blue B
    • -s <string> : puts <string> between each word
    • -c <string> : puts <string> between each character
  Example:
    !emoji -a -s :thinking: can the mods ban us all
!purge <number>
  Delete messages up to the requested number
  Default value: 1
  Limit: 5
!avatar
  Replies with your avatar
!help
  Displays help text (this thing)
```

## Setup
Requirements - Node.js (version 6+)

1. Clone this repo
2. Run `npm install`
3. Create new app under `My Applications` > `Bot` on [Discord Developer Console](https://discordapp.com/developers/applications/me/) and grab your bot token
4. Create an empty `config.json`.
5. Run `node setup.js` and follow the instructions
6. Add bot to server with the following URL:
`https://discordapp.com/api/oauth2/authorize?client_id=<bot_client_id>&scope=bot`
7. Run the bot with `node BasementBot.js`

## Notes
* Give `Manage Messages` text permissions to allow it to delete the command calls and to purge.
* Default values are found in the `config.json`
