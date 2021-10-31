const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");

module.exports = {
    name: "skip",
    aliases: ["s", "fs"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        message.channel.send(`\> Skipped <:Sucess:888743744105492541>`).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5*1000)
        })
        index.distube.skip(message)
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