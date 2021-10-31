const {prefix} = require("../config.json");
const {User} = require("../store/user/User");

module.exports = {
    name: "check",
    aliases: ["ch"],
    run: (client, message, args) => {

        User.findOne({uniqueID: message.guild.id.toString()}, function (err, user) {
            if (err) throw err;

            if (!user) {
                message.channel.send(`\> ${message.author}, user doesn't exist <:Error:888743744277463141> ...`);
                return;
            }

            if(user["premium"] === true) {
                message.channel.send("premium")
                return;
            }

            message.channel.reply("no premium")

        });
    },
    help: (message) => {
    }
};