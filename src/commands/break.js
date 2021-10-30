const index = require('../index.js')
const {distube} = require("../index");

module.exports = {
    name: "pause",
    aliases: ["pa", "break"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        if(index.distube.getQueue(message).paused) {
            index.distube.resume(message);
            message.channel.send(`\> <:LogoMic:888743744277463140> Musique résumé.`);
        } else {
            index.distube.pause(message)
            message.channel.send(`\> <:LogoMic:888743744277463140> Musique mis en pause.`);
        }
    }
}