const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {logo, color, footer} = require("../utils/embedRessource");

module.exports = {
    name: "stop",
    aliases: ["deco", "disconnect", "leave"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        message.channel.send(`\> Leaved <:Sucess:888743744105492541>`).then(msg => { msg.delete({ timeout: 4000 })})
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