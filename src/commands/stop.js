const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {logo, color, footer} = require("../utils/embedRessource");
const {icons} = require("../config.json")
const {sendError, sendSuccess} = require("../utils/utils");
const {User} = require("../store/user/User");

module.exports = {
    name: "stop",
    aliases: ["deco", "disconnect", "leave"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            sendError(message, "Vous devez être connecté dans un salon vocal.")
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
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

                index.distube.stop(message)
                sendSuccess(message, "Leaved.")
            }
        });


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