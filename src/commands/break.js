const index = require('../index.js')
const {distube} = require("../index");
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");

module.exports = {
    name: "pause",
    aliases: ["pa", "break"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        if(index.distube.getQueue(message).paused) {
            index.distube.resume(message);
            message.channel.send(`\> <:LogoMic:888743744277463140> Musique résumé.`);
        } else {
            index.distube.pause(message)
            message.channel.send(`\> <:LogoMic:888743744277463140> Musique mis en pause.`);
        }
    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande pause")
            .setDescription("La commande **pause** permet de mettre en pause la musique en cour")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Aliases", value: "`*pa`, `*break`", inline: true},
                {name: "Example", value: "`*loop`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");
        
        message.reply({embeds: [embed]});
    }
}