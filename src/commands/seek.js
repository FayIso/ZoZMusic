const index = require('../index.js')

module.exports = {
    name: "seek",
    aliases: ["sk"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
        }

        if(args.length === 0 || args.length < 1)
        {
            message.channel.send('\> Veuillez préciser une timeline <:Error:888743744277463141> !')
        }

        index.distube.seek(message, Number(args[0]))
    }
}