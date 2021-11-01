const index = require('../index.js');
const {owners, icons} = require("../config.json");
const {keygen, sendError} = require("../utils/utils");
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
                sendError(interaction, "Veuillez être connecté sur un salon vocal.")
                return;
            }

            /*if(index.distube.getQueue(interaction.message) === undefined) {
                interaction.reply("\> Aucune musique n'est en train de jouer <:Error:888743744277463141> !");
                return
            }*/

            try {
                index.distube.skip(interaction)
                interaction.reply(`\> Skipped ${icons.success}`);
            } catch (error) {
                sendError(interaction, "Impossible de passer la musique.")
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
                        interaction.reply({embeds: [gen]});
                        interaction.message.delete()
                    }
                });
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
                        interaction.reply({embeds: [gen]});
                        interaction.message.delete()
                    }
                });
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
                        interaction.reply({embeds: [gen]});
                        interaction.message.delete()
                    }
                });
            } else {
                interaction.message.delete()
                return
            }
            break;
    }

}