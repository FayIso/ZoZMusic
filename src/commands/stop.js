const index = require('../index.js')

module.exports = {
    name: "stop",
    aliases: ["deco", "disconnect", "leave"],
    run: (client, message, args) => {
        if (!message.member.voice.channel) {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
        }
        else
        message.channel.send(`\> Leaved <:Sucess:888743744105492541>`).then(msg => { msg.delete({ timeout: 4000 })})
        index.distube.stop(message)
    }
}