const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {logo, color, footer} = require("../utils/embedRessource");
const {icons} = require("../config.json")

module.exports = {
    name: "stop",
    aliases: ["deco", "disconnect", "leave"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.reply('\> Veuillez être connecté sur un salon vocal ' + icons.error + '');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.reply("\> Aucune musique n'est en train de jouer " + icons.error + "!");
            return
        }

        message.reply(`\> Leaved \`${icons.success}\``);
        index.distube.stop(message)
    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande stop")
            .setDescription("La commande **stop** permet de déconnecter le bot du salon")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Aliase", value: "`*deco`, `*deconnecte`, `*leave`",inline: true},
                {name: "Example", value: "`*stop`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");

        message.reply({embeds: [embed]});
    }
}