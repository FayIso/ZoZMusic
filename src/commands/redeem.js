const {prefix} = require("../config.json");
const {Key} = require("../store/key/Key");
const {User} = require("../store/user/User");
const {icons} = require("../config.json")
const {passgen} = require("../utils/utils");

module.exports = {
    name: "redeem",
    aliases: ["red", "claim"],
    run: (client, message, args) => {
        message.delete();
        const claim = args.join(" ");

        if (!claim) {
            message.channel.send(`\> Usage: **${prefix}redeem** + **<key>** `).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 3 * 1000)
            });
            return;
        }

        Key.findOne({key: claim}, function (err, key) {
            if (err) throw err;

            if (!key) {
                message.reply(`\> Sorry, the key **doesn't exist** or **already redeemed** ${icons.error} ...`);
                return;
            }

            const password = passgen(10);

            User.findOne({uniqueID: message.guild.id.toString()}, function (err, user) {
                if (err) throw err;
                if (!user) {
                    message.reply(`\> Sorry, user doesn't exist ${icons.error} ...`);
                    return;
                }

                if (user["premium"] === true) {
                    message.reply(
                        `\> Sorry, This server are already an active **Premium ZoZ® License**`
                    );
                    return;
                }

                User.updateOne({uniqueID: message.guild.id.toString()}, {
                    password: password,
                    premium: true,
                    key: claim
                }, function (err) {
                    if (err) throw err;
                    message.author.createDM().then((channel) => {
                        channel.send(
                            `**_You are use ZoZ® Premium Key in __${message.guild.name}__ _** \n\n\> \`\`Please don't forget your pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n If you have question contact **ZoZ Administrator** !`
                        );
                    });
                    message.channel.send(
                        `\> ${message.author}, key successfull redeemed ! **Server have become a Premium ZoZ® Server** ${icons.success} !`
                    );
                });

                Key.deleteOne({key: claim}, function (err) {
                    if (err) throw err;
                });


            });

        });
    },
    help: (message) => {
    }
};