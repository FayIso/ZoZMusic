const {prefix} = require("../config.json");
const {Key} = require("../store/key/Key");
const {User} = require("../store/user/User");

module.exports = {
    name: "redeem",
    aliases: ["red"],
    run: (client, message, args) => {
        //// PASSWORD GEN ---> START ////
        function passw(length) {
            var result = [];
            var characters = "ABCD0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result.push(
                    characters.charAt(Math.floor(Math.random() * charactersLength))
                );
            }
            return result.join("");
        }

        //// PASSWORD GEN ---> END ////

        message.delete();
        const claim = args.join(" ");

        if (!claim) {
            message.channel.send(`\> Usage: **${prefix}claim** + **<key>** `).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 3 * 1000)
            });
            return;
        }

        Key.findOne({key: claim}, function (err, key) {
            if (err) throw err;

            if (!key) {
                message.channel.send(`\> ${message.author}, key **doesn't exist** or **already redeemed** <:Error:888743744277463141> ...`);
                return;
            }

            const password = passw(10);

            User.findOne({uniqueID: message.guild.id.toString()}, function (err, user) {
                if (err) throw err;
                if (!user) {
                    message.reply(`\> ${message.author}, user doesn't exist <:Error:888743744277463141> ...`);
                    return;
                }

                if (user["premium"] === true) {
                    message.channel.send(
                        `\> ${message.author}, This server are already an active **Premium ZoZ® License**`
                    );
                    return;
                }

                User.updateOne({uniqueID: message.guild.id.toString()}, {
                    password: password,
                    premium: true,
                    key: claim
                }, function (err, docs) {
                    if (err) throw err;
                    message.author.createDM().then((channel) => {
                        channel.send(
                            `**_You are use ZoZ® Premium Key in __${message.guild.name}__ _** \n\n\> \`\`Please don't forget your pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n If you have question contact **ZoZ Administrator** !`
                        );
                    });
                    message.channel.send(
                        `\> ${message.author}, key successfull redeemed ! **Server have become a Premium ZoZ® Server** <:Sucess:888743744105492541> !`
                    );
                });

                Key.deleteOne({key: claim}, function (err, docs) {
                    if (err) throw err;
                });


            });

        });
    },
    help: (message) => {
    }
};