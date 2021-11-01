const index = require('../index.js')
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");


module.exports = {
    name: "get",
    aliases: ["queue"],
    run: (client, message, args) => {

        let queue = index.distube.getQueue(message);
        let position;
        let songs = "\n";

        queue.songs.map((song, id) => {
            if (id + 1 === 1) {
                position = "er"
            } else {
                position = "ème"
            }

            songs = songs + `**${id+1}${position} Musique :** \`\`${song.name}\`\` - (\`\`${song.formattedDuration}\`\`) \n \n`;

        });

        const queueEmbed = new MessageEmbed()
            .setColor("#33BBFF")
            .setAuthor(`|  Musique dans la File d'Attente ... `, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(songs);
        message.channel.send({embeds: [queueEmbed]})
    }
}