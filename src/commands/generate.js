const {owners} = require("../config.json");
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");


module.exports = {
    name: "gen",
    aliases: ["gen"],
    run: (client, message, args) => {


        message.delete()
        if (owners.includes(message.author.id)) {
            const keyszoz = new MessageEmbed()
                .setColor("#33BBFF")
                .setAuthor(`| What do you want to use`, message.author.displayAvatarURL({dynamic: true}))
                .setDescription(`\> Please select the type of **Key** you want to generate: `);


            const keyGeneration = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('idButtonWeeklyKey')
                    .setLabel(" ▪ Weekly ▪ ")
                    .setStyle("SUCCESS")
                    .setEmoji(''),
                new MessageButton()
                    .setCustomId('idButtonMonthlyKey')
                    .setLabel(" ▪ Monthly ▪ ")
                    .setStyle("PRIMARY")
                    .setEmoji(''),
                new MessageButton()
                    .setCustomId('idButtonLifetimeKey')
                    .setLabel(" ▪ Lifetime ▪ ")
                    .setStyle("SECONDARY")
                    .setEmoji('')
            );

            message.channel.send({embeds: [keyszoz], components: [keyGeneration]})

        } else {
            message.delete()
        }
    },
    help: (message) => {
    }
}