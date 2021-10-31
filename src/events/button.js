const index = require('../index.js');
const {owners} = require("../config.json");
const {keygen} = require("../utils/utils");
const {Key} = require("../store/key/Key");
const {MessageEmbed} = require("discord.js");

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
                interaction.reply('\> Veuillez être connecté sur un salon vocal <:Error:888743744277463141>');
                return;
            }

            /*if(index.distube.getQueue(interaction.message) === undefined) {
                interaction.reply("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
                return
            }*/

            try {
                index.distube.skip(interaction)
                interaction.reply(`\> Skipped <:Success:888743744105492541>`);
            } catch (error) {
                interaction.message.reply("\> Impossible de passer la musique <:Error:888743744277463141> !")
            }
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