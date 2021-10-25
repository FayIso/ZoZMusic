const Discord = require('discord.js');
const fs = require("fs");
const {prefix} = require("../config.json");
const index = require('../index.js')

module.exports = async message => {
    let client = message.client;
    if(message.author.bot) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (!message.content.startsWith(prefix)) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase().replace(prefix, "");

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);

    // Run the Premium Command
    
}