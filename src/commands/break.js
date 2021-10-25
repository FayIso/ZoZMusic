const index = require('../index.js')

module.exports = {
    name: "pause",
    aliases: ["pa", "break"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
        }

        if(index.distube.isPaused(message)) {
            index.distube.resume(message);
            message.channel.send(`\> <:LogoMic:888743744277463140> Musique résumé.`);
        } else {
            index.distube.pause(message)
            message.channel.send(`\> <:LogoMic:888743744277463140> Musique mis en pause.`);
        }
    }
}