const Discord = require('discord.js');
const {User} = require("../store/user/User");
const {prefix} = require("../config.json")
const index = require('../index.js')
const {icons} = require("../config.json");

module.exports = async message => {
    let client = message.client;
    if(message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase().replace(prefix, "");

    const cmd = client.commands.get(command);

    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
}