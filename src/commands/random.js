const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {logo, color, footer} = require("../utils/embedRessource");
const {sendError} = require("../utils/utils");

module.exports = {
    name: "random",
    aliases: ["random"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            sendError(message, "Vous devez être connecté dans un salon vocal.")
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            sendError(message, "Aucune musique n'est en cours de lecture.")
            return
        }

        index.distube.shuffle(message);
        message.channel.reply(`\> 📯 La playlist est devenue aléatoire.`);
    },

    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande random")
            .setDescription("La commande **random** permet de mélanger la playlist")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Example", value: "`*random`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");

        message.reply({embeds: [embed]})
    }
}