const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const {icons} = require("../config.json")
const {sendError} = require("../utils/utils");
const {User} = require("../store/user/User");

module.exports = {
    name: "pause",
    aliases: ["pa", "break"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            sendError(message, "Vous devez être connecté dans un salon vocal.")
            return;
        }

        if (index.distube.getQueue(message) === undefined) {
            sendError(message, "Aucune musique n'est en cours de lecture.")
            return
        }

        User.findOne({uniqueID: message.guild.id.toString()}, function (err, user) {
            if (err) throw err;
            if (!user) return;

            if (user) {
                if(user["isPaused"] === true) {
                    sendError(message, "Une interruption est en cours...")
                    return;
                }

                if (index.distube.getQueue(message).paused) {
                    index.distube.resume(message);
                    message.reply('\> ' + icons.song + ' Musique résumé.');
                } else {
                    index.distube.pause(message)
                    message.reply('\> ' + icons.song + ' Musique mis en pause.');
                }
            }
        });

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