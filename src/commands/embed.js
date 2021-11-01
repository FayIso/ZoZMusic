const config = require("../config.json")
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "em",
    aliases: ["em"],
    run: (client, message, args) => {



        message.channel.send({embeds: [interruptionEmbed]})
    }
}
