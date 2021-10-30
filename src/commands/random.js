const index = require('../index.js')

module.exports = {
    name: "random",
    aliases: ["random"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        index.distube.shuffle(message);
        message.channel.send(`\> 📯 La playlist est devenue aléatoire.`);
    }
}