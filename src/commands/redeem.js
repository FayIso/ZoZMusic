const {prefix} = require("../config.json");
const {Key} = require("../store/key/Key");
const {User} = require("../store/user/User");
const {icons} = require("../config.json")
const {passgen, sendError} = require("../utils/utils");

module.exports = {
    name: "redeem",
    aliases: ["activate", "claim"],
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
                sendError(message, "Désolé, la clé **n'existe pas** ou elle est **déjà activée**.")
                return;
            }

            const password = passgen(10);

            User.findOne({uniqueID: message.guild.id.toString()}, function (err, user) {
                if (err) throw err;
                if (!user) {
                    sendError(message, "Désolé l'utilisateur n'existe pas.")
                    return;
                }


                if (user["premium"] === false) {

                    if (key["expiry"] === "Week") {
                        User.updateOne({uniqueID: message.guild.id.toString()}, {
                            password: password,
                            premium: true,
                            key: claim,
                            expiry: "7.00"
                        }, function (err) {
                            if (err) throw err;
                            message.author.createDM().then((channel) => {
                                channel.send(
                                    `Vous avez utilisé une **License Premium ZoZ®** __${message.guild.name}__ \n\n\> \`\`N'oubliez pas votre Pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n Si vous avez des question veuillez contacter un **Administrateur ZoZ** !`
                                );
                            });
                            message.channel.send(
                                `\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **7 Jours 00 Heures**`
                            );
                        });
                    }

                    if (key["expiry"] === "Month") {
                        User.updateOne({uniqueID: message.guild.id.toString()}, {
                            password: password,
                            premium: true,
                            key: claim,
                            expiry: "30.00"
                        }, function (err) {
                            if (err) throw err;
                            message.author.createDM().then((channel) => {
                                channel.send(
                                    `Vous avez utilisé une **License Premium ZoZ®** __${message.guild.name}__ \n\n\> \`\`N'oubliez pas votre Pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n Si vous avez des question veuillez contacter un **Administrateur ZoZ** !`
                                );
                            });
                            message.channel.send(
                                `\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **30 Jours 00 Heures**`
                            );
                        });
                    }

                    if (key["expiry"] === "Lifetime") {
                        User.updateOne({uniqueID: message.guild.id.toString()}, {
                            password: password,
                            premium: true,
                            key: claim,
                            expiry: "Never"
                        }, function (err) {
                            if (err) throw err;
                            message.author.createDM().then((channel) => {
                                channel.send(
                                    `Vous avez utilisé une **License Premium ZoZ®** __${message.guild.name}__ \n\n\> \`\`N'oubliez pas votre Pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n Si vous avez des question veuillez contacter un **Administrateur ZoZ** !`
                                );
                            });
                            message.channel.send(
                                `\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **Never**`
                            );
                        });
                        return;
                    }

                    Key.deleteOne({key: claim}, function (err) {
                        if (err) throw err;
                    });

                    return;
                }

                if(key["expiry"] === "Week") {

                    if(user["expiry"] === "Never") {
                        message.channel.send(`\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **Jamais**`
                        );
                        return;
                    }

                    let ex = user["expiry"].split(".")
                    let days = parseInt(ex[0])
                    let hours = parseInt(ex[1])
                    let days1 = (days)+7

                    let expiryNew = (days1 + "." + hours).toString();

                    User.updateOne({uniqueID: message.guild.id.toString()}, {
                        key: claim,
                        expiry: expiryNew
                    }, function (err) {
                        if (err) throw err;
                        message.author.createDM().then((channel) => {
                            channel.send(
                                `Vous avez utilisé une **License Premium ZoZ®** __${message.guild.name}__ \n\n\> \`\`N'oubliez pas votre Pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n Si vous avez des question veuillez contacter un **Administrateur ZoZ** !`
                            );
                        });
                        message.channel.send(
                            `\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **${days1} Jours ${hours} Heures**`
                        );
                    });
                }

                if(key["expiry"] === "Month") {

                    if(user["expiry"] === "Never") {
                        message.channel.send(`\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **Jamais**`
                        );
                        return;
                    }

                    let ex = user["expiry"].split(".")
                    let days = parseInt(ex[0])
                    let hours = parseInt(ex[1])
                    let days1 = (days)+30

                    let expiryNew = (days1 + "." + hours).toString();

                    User.updateOne({uniqueID: message.guild.id.toString()}, {
                        key: claim,
                        expiry: expiryNew
                    }, function (err) {
                        if (err) throw err;
                        message.author.createDM().then((channel) => {
                            channel.send(
                                `Vous avez utilisé une **License Premium ZoZ®** __${message.guild.name}__ \n\n\> \`\`N'oubliez pas votre Pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n Si vous avez des question veuillez contacter un **Administrateur ZoZ** !`
                            );
                        });
                        message.channel.send(
                            `\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **${days1} Jours ${hours} Heures**`
                        );
                    });
                }

                if(key["expiry"] === "Lifetime") {

                    User.updateOne({uniqueID: message.guild.id.toString()}, {
                        key: claim,
                        expiry: "Never"
                    }, function (err) {
                        if (err) throw err;
                        message.author.createDM().then((channel) => {
                            channel.send(
                                `Vous avez utilisé une **License Premium ZoZ®** __${message.guild.name}__ \n\n\> \`\`N'oubliez pas votre Pass !\`\`\n\n\> Pass : \`\`${password}\`\`\n\n Si vous avez des question veuillez contacter un **Administrateur ZoZ** !`
                            );
                        });
                        message.channel.send(
                            `\> ${message.author}, la clé a bien été activé sur votre serveur ! **Ce server est devenue un Serveur Premium ZoZ®**  ${icons.success} | Expire: **Jamais**`
                        );
                    });
                }

                Key.deleteOne({key: claim}, function (err) {
                    if (err) throw err;
                });

            });

        });
    },
    help: (message) => {
    }
};