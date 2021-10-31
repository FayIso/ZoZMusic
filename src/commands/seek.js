const index = require('../index.js')
const {icons} = require("../config.json")

module.exports = {
    name: "seek",
    aliases: ["sk"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal ' + icons.error +' !');
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            message.channel.send("\> Aucune musique n'est en train de jouer " + icons.error +" !");
            return;
        }

        if(args.length === 0 || args.length < 1) {
            message.channel.send('\> Veuillez préciser une timeline  ' + icons.error + ' !')
            return;
        }


        index.distube.seek(message, Number(args[0]))
    },
    help: (message) => {}
}