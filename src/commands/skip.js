const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const {icons} = require("../config.json")

module.exports = {
    name: "skip",
    aliases: ["s", "fs"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.reply('\> Veuillez être connecté sur un salon vocal ' + icons.error +' ');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.reply("\> Aucune musique n'est en train de jouer " + icons.error + " !");
            return
        }

        try {
            index.distube.skip(message);
            message.reply(`\> Skipped \`${icons.success}\` `)
        } catch (error) {
            message.reply("\> Impossible de passer la musique " + icons.error +" !")
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