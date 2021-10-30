const index = require('../index.js')

module.exports = {
    name: "loop",
    aliases: ["l"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        let mode = index.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repetition de la liste" : "Repetition du song" : "Off";
        message.channel.send(`\> <:Loop:888743744201957456> Loop: ${mode}`);
    }
}