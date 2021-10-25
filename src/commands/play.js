const index = require('../index.js')
const {db} = require("../index.js");

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: (client, message, args) => {

        if(!message.member.voice.channel)
        {
            message.channel.send('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141> !');
        }
        else
        {
            if(args.length === 0)
            {
                message.channel.send('\> Veuillez préciser une musique <:Error:888743744277463141> !')
            }
            else
            {
                index.distube.play(message, args.join(" "))
            }            
        }
    }
}