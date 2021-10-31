const index = require('../index.js')
const {db} = require("../index.js");
const {MessageEmbed} = require("discord.js");
const {footer, color, logo} = require("../utils/embedRessource");
const button = require("../utils/button")

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: (client, message, args) => {

        if(!message.member.voice.channel)
        {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
        }
        else
        {
            if(args.length === 0)
            {
                message.channel.send('\> Veuillez préciser une musique <:Error:888743744277463141> !')
            }
            else
            {
                index.distube.play(message, args.join(" "))
            }            
        }
    },
    help: (message) => {
        let embed = new MessageEmbed()
            .setTitle("Commande play")
            .setDescription("La commande **play** permet de jouer la musique selectionner")
            .setFooter(footer)
            .setColor(color)
            .setThumbnail(logo)
            .setTimestamp()
            .addFields(
                {name: "Aliase", value: "`*p`",inline: true},
                {name: "Example", value: "`*play <nom de la musique>`", inline: true}
            )
            .addField("Information", "Pour plus de commandes faites `*help`");

        message.reply({embeds: [embed]})
    }
}