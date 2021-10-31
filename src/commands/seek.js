const index = require('../index.js')

module.exports = {
    name: "seek",
    aliases: ["sk"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
            return
        }

        if(args.length === 0 || args.length < 1) {
            message.channel.send('\> Veuillez préciser une timeline <:Error:888743744277463141> !')
            return;
        }


        index.distube.seek(message, Number(args[0]))
    },
    help: (message) => {}
}