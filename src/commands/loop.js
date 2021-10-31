const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const {icons} = require("../config.json")

module.exports = {
    name: "loop",
    aliases: ["l"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal ' + icons.error + ' !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer " + icons.error +" !");
            return
        }

        let mode = index.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode === 2 ? "Repetition de la liste" : "Repetition du song" : "Off";
        message.channel.send(`\> \`${icons.loop}\` Loop: ${mode}`);
    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande loop")
            .setDescription("La commande **pause** permet de mettre en boucle la musique en cour")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Aliases", value: "`*l`", inline: true},
                {name: "Example", value: "`*loop`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");

        message.reply({embeds: [embed]})
    }
}