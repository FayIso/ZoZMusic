const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const {icons} = require("../config.json")

module.exports = {
    name: "pause",
    aliases: ["pa", "break"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.reply('\> Veuillez être connecté sur un salon vocal ' + icons.error  +' !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.reply("\> Aucune musique n'est en train de jouer " + icons.error +" !");
            return
        }

        if(index.distube.getQueue(message).paused) {
            index.distube.resume(message);
            message.reply('\> ' + icons.song + ' Musique résumé.').then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 5 * 1000)
            });
        } else {
            index.distube.pause(message)
            message.reply('\> ' + icons.song + ' Musique mis en pause.').then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 5 * 1000)
            });
        }
    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande pause")
            .setDescription("La commande **pause** permet de mettre en pause la musique en cours")
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