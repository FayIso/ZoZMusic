const index = require('../index.js')

module.exports = {
    name: "random",
    aliases: ["random"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
        }

        index.distube.shuffle(message);
        message.channel.send(`\> 📯 La playlist est devenue aléatoire.`);
    }
}