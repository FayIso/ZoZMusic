const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const {icons} = require("../config.json")
const {sendError} = require("../utils/utils");

module.exports = {
    name: "skip",
    aliases: ["s", "fs"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            sendError(message, "Vous devez être connecté dans un salon vocal.")
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            sendError(message, "Aucune musique n'est en cours de lecture.")
            return
        }

        try {
            index.distube.skip(message);
            message.reply(`\> Skipped ${icons.success} `)
        } catch (error) {
            sendError(message, "Impossible de passer la musique.")
        }

    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande skip")
            .setDescription("La commande **skip** permet de passer à la commande suivante")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Aliase", value: "`*s`, `*fs`",inline: true},
                {name: "Example", value: "`*skip`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");

        message.reply({embeds: [embed]});
    }
}