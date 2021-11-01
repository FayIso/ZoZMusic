const {MessageEmbed} = require("discord.js");
const {icons} = require("../config.json")
const {User} = require("../store/user/User");

module.exports = {
    keygen: (length) => {
        var result = [];
        var characters = '0123456789*[]/-+=ABCDEFGHIJKLMNOPabcdefghijklmnop';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    },
    passgen: (length) => {
        var result = [];
        var characters = "ABCD0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(
                characters.charAt(Math.floor(Math.random() * charactersLength))
            );
        }
        return result.join("");
    },
    sendError: (message, error) => {
        const errorEmbed = new MessageEmbed()
            .setColor("#FC3D3D")
            .setDescription(`\> ${error} ${icons.error}`);

        message.reply({embeds: [errorEmbed]})
    },
    updateExpiry: () => {
        User.find({premium: true}, function (err, user) {
            if (err) throw err;
            if (!user) return;

            for(var i=0; i<user.length; i++)
            {

                if (user[i]["expiry"] === "Never") return;

                let ex = user[i]["expiry"].split(".")
                let days = parseInt(ex[0])
                let hours = parseInt(ex[1])
                let h1 = (hours) - 1

                if (days === 0 && hours === 0) {

                    User.updateOne({uniqueID: user[i]["uniqueID"]}, {
                        premium: false
                    }, function (err) {
                        if (err) throw err;
                    });

                } else if (hours === 0) {

                    let newExpiry = `${days-1}.23`.toString()
                    User.updateOne({uniqueID: user[i]["uniqueID"]}, {
                        expiry: newExpiry
                    }, function (err) {
                        if (err) throw err;
                    });

                } else {

                    let expiry = (days + "." + h1).toString();
                    User.updateOne({uniqueID: user[i]["uniqueID"]}, {
                        expiry: expiry
                    }, function (err) {
                        if (err) throw err;
                    });
                }
            }
        })
    }


}