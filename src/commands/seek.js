const index = require('../index.js')
const {sendError} = require("../utils/utils");

module.exports = {
    name: "seek",
    aliases: ["sk"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            sendError(message, "Vous devez être connecté dans un salon vocal.")
            return;
        }

        if(index.distube.getQueue(message) === undefined) {
            sendError(message, "Aucune musique n'est en cours de lecture.")
            return
        }

        if(args.length === 0 || args.length < 1) {
            sendError(message, "Veuillez préciser une timeline(en ms).")
            return;
        }


        index.distube.seek(message, Number(args[0]))
    },
    help: (message) => {}
}