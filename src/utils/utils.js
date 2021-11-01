const {MessageEmbed} = require("discord.js");
const {icons} = require("../config.json")

module.exports = {
    keygen: (length) => {
        var result = [];
        var characters = '0123456789*[]/-+=ABCDEFGHIJKLMNOPabcdefghijklmnop';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    },
    passgen: (length) => {
        var result = [];
        var characters = "ABCD0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(
                characters.charAt(Math.floor(Math.random() * charactersLength))
            );
        }
        return result.join("");
    },
    sendError: (message, error) => {
        const errorEmbed = new MessageEmbed()
            .setColor("#FC3D3D")
            .setDescription(`\> ${error} ${icons.error}`);

        message.reply({embeds: [errorEmbed]})
    },
    sendSuccess: (message, success) => {
        const successEmbed = new MessageEmbed()
            .setColor("#6FFF7C")
            .setDescription(`\> ${success} ${icons.success}`);

        message.reply({embeds: [successEmbed]})
    },
    sendSong: (message, song) => {
        const songEmbed = new MessageEmbed()
            .setColor("#FEC93A")
            .setDescription(`\> ${song} ${icons.song}`);

        message.reply({embeds: [songEmbed]})
    },
}