const index = require('../index.js')
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");

module.exports = {
    name: "help",
    aliases: ["h"],
    run: (client, message, args) => {
        index.client.helps.forEach(commands => {

            if(args.length <= 0) {
                if(commands.name === "help") {
                    commands.help(message);
                }
                return;
            }

            if(commands.name === args[0]) {
                commands.help(message);
            }
        })

    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande d'aide")
            .setDescription("Ecrivez `*help <nom de la commande>` pour plus d'information sur elle")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "play", value: "Joue un morceau", inline: true},
                {name: "skip", value: "Passe au morceau suivant", inline: true},
                {name: "pause", value: "Met en pause la musique", inline: true},
                {name: "loop", value: "Créé un boucle", inline: true},
                {name: "random", value: "mélange l'ordre de la playlist", inline: true},
                {name: "stop", value: "Deconnecte le bot", inline: true}
            )
            .addField("Information", "Pour plus d'information rejoinez avec le lien : \nhttps://discord.gg/bvRbDg2scT");

        message.reply({embeds: [embed]});
    }
};