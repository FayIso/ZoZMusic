const index = require('../index.js');
const {owners, icons} = require("../config.json");
const {keygen, sendError} = require("../utils/utils");
const {Key} = require("../store/key/Key");
const {MessageEmbed} = require("discord.js");
const {User} = require("../store/user/User");

module.exports = async interaction => {
    if (!interaction.isButton()) return;

    switch (interaction.customId) {
        /**
         * PLAY
         */
        case "idButtonPauseResume":
            require("../commands/break").run(index.client, interaction, "");
            break;
        case "idButtonSkip":
            if (!interaction.member.voice.channel) {
                sendError(interaction, "Vous devez être connecté dans un salon vocal.")
                return;
            }

            if(index.distube.getQueue(interaction) === undefined) {
                sendError(interaction, "Aucune musique n'est en cours de lecture.")
                return
            }

            User.findOne({uniqueID: interaction.guild.id.toString()}, function (err, user) {
                if (err) throw err;
                if (!user) return;

                if (user) {
                    if(user["isPaused"] === true) {
                        sendError(interaction, "Une interruption est en cours...")
                        return;
                    }

                    let queue = index.distube.getQueue(interaction);

                    if(queue.songs.length <= 1) {
                        sendError(interaction, "Aucune musique n'est disponible après.")
                        return;
                    }
                    index.distube.skip(interaction);
                    interaction.reply(`\> Skipped ${icons.success} `)

                }
            });
            break;
        case "idButtonStop":
            require("../commands/stop").run(index.client, interaction, "");
            break;

        /**
         * KEY
         */
        case "idButtonWeeklyKey":
            if(owners.includes(interaction.user.id)) {
                const key = "Zoz-" + keygen(12);
                Key.findOne({key: key}, function (err, keyDocument) {
                    if (err) throw err;

                    if (!keyDocument) {
                        let keyModel = new Key({
                            key: key,
                            expiry : "Week"
                        });
                        keyModel.save(function (err) {
                            console.log(err)
                        });

                        let gen = new MessageEmbed()
                            .setColor("#66b4ff")
                            .setDescription(`\> **ZoZ Premium Key :** ${key} \n\> **Expiry** : Weekly`)
                        interaction.user.send({embeds: [gen]})
                    }
                });
                interaction.reply("\> **Check Your Private Message ...** ");
                setTimeout(function() {
                    interaction.message.delete()
                    interaction.deleteReply();
                }, 3000)
            } else {
                interaction.message.delete()
            }
            break;
        case "idButtonMonthlyKey":
            if(owners.includes(interaction.user.id)) {
                const key = "Zoz-" + keygen(12);
                Key.findOne({key: key}, function (err, keyDocument) {
                    if (err) throw err;

                    if (!keyDocument)
                    {
                        let keyModel = new Key({
                            key: key,
                            expiry : "Month"
                        });
                        keyModel.save(function (err) {
                            console.log(err)
                        });

                        let gen = new MessageEmbed()
                            .setColor("#66b4ff")
                            .setDescription(`\> **ZoZ Premium Key :** ${key} \n\> **Expiry** : Lifetime`)
                        interaction.user.send({embeds: [gen]})
                    }
                });
                interaction.reply("\> **Check Your Private Message ...** ");
                setTimeout(function() {
                    interaction.message.delete()
                    interaction.deleteReply()
                }, 3000)
            } else {
                interaction.message.delete()
                return
            }
            break;
        case "idButtonLifetimeKey":
            if(owners.includes(interaction.user.id)) {
                const key = "Zoz-" + keygen(12);
                Key.findOne({key: key}, function (err, keyDocument) {
                    if (err) throw err;

                    if (!keyDocument)
                    {
                        let keyModel = new Key({
                            key: key,
                            expiry : "Lifetime"
                        });
                        keyModel.save(function (err) {
                            console.log(err)
                        });

                        let gen = new MessageEmbed()
                            .setColor("#66b4ff")
                            .setDescription(`\> **ZoZ Premium Key :** ${key} \n\> **Expiry** : Lifetime`)
                        interaction.user.send({embeds: [gen]})
                    }
                });
                interaction.reply("\> **Check Your Private Message ...** ");
                setTimeout(function() {
                    interaction.message.delete()
                    interaction.deleteReply()
                }, 3000)
            } else {
                interaction.message.delete()
                return
            }
            break;
    }

}