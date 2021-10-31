const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {logo, color, footer} = require("../utils/embedRessource");

module.exports = {
    name: "random",
    aliases: ["random"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        index.distube.shuffle(message);
        message.channel.send(`\> 📯 La playlist est devenue aléatoire.`);
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