const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const {sendError} = require("../utils/utils");

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: (client, message, args) => {

        if (!message.member.voice.channel) {
            sendError(message, "Vous devez être connecté dans un salon vocal.")
            return;
        } else {
            if(args.length === 0) {
                sendError(message, "Veuillez preciser une musique.")
            } else {
                index.distube.play(message, args.join(" "))
            }            
        }
    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande play")
            .setDescription("La commande **play** permet de jouer la musique selectionner")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Aliase", value: "`*p`",inline: true},
                {name: "Example", value: "`*play <nom de la musique>`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");

        message.reply({embeds: [embed]})
    }
}