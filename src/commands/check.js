const {prefix} = require("../config.json");
const {User} = require("../store/user/User");

module.exports = {
    name: "check",
    aliases: ["chk"],
    run: (client, message, args) => {

        User.findOne({uniqueID: message.guild.id.toString()}, function (err, user) {
            if (err) throw err;

            if (!user) {
                message.channel.send(`\> ``ERROR 404`` `);
                return;
            }

            if(user["premium"] === true) {
                const expire = user["expiry"].split(".")
                const days = expire[0]
                const hours = expire[1]
                const finalExpiry = `${days} Jours ${hours} Heures`
                message.channel.send(`\> Ce server a une **License Premium ZoZ®** | Expire: **${finalExpiry}**`)
                return;
            }

            message.channel.send(`\> Ce server n'a pas de **License Premium ZoZ®** ! `)

        });
    },
    help: (message) => {
    }
};