const {keyprefix, owners} = require("../config.json");
const ZoZ = require("discord.js");
const {db} = require("../index.js");
const {Key} = require("../store/key/Key");
const {User} = require("../store/user/User");


module.exports = {
    name: "gen",
    aliases: ["gen"],
    run: (client, message, args) => {

        function keygen(length) {
            var result = [];
            var characters = '0123456789*[]/-+=ABCDEFGHIJKLMNOPabcdefghijklmnop';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result.push(characters.charAt(Math.floor(Math.random() *
                    charactersLength)));
            }
            return result.join('');
        }

        /////////////// COMMANDE GEN ///////////////

        message.delete()
        if (owners.includes(message.author.id)) {
            // DATE //
            var exp = new Date();
            var anneeexp = exp.getFullYear()
            var moisexp = (exp.getMonth() + 1)
            var jourexp = exp.getDate()
            var fulldate = jourexp + "/" + moisexp + "/" + anneeexp;

            const key = keyprefix + "-" + keygen(12);
            Key.findOne({key: key}, function (err, keyDocument) {
                if (err) throw err;

                if (!keyDocument) {
                    let keyModel = new Key({
                        key: key
                    });
                    keyModel.save(function (err) {
                        console.log(err)
                    });
                    message.author.createDM().then(channel => {
                        let gen = new ZoZ.MessageEmbed()
                            .setColor("#66b4ff")
                            .setDescription(`\> **ZoZ Premium Key :** ${key}`)
                        channel.send({embeds: [gen]})
                    })
                }

            });
            message.channel.send("\> **DM** <:Sucess:888743744105492541> ! ").then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 2*1000)
            })
        } else {
            message.delete()
            return;
        }
    },
    help: (message) => {}
}