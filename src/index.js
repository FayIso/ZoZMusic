const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {DisTube} = require("distube")
const {prefix, token, icons} = require("./config.json");
const mongoose = require("mongoose");
const fs = require("fs");
const {SpotifyPlugin} = require("@distube/spotify");
const DeezerPlugin = require("./utils/deezer");
const {User} = require("./store/user/User");
const {updateExpiry} = require("./utils/utils");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]})
const distube = new DisTube(client, {
    searchSongs: 10,
    emitNewSongOnly: false,
    plugins: [new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false
    }), new DeezerPlugin({
        parallel: true
    })]
})
client.commands = new Collection();
client.helps = new Collection();
mongoose.connect("mongodb://127.0.0.1:27017/zoz");

/**
 * Zoz commands
 */
console.log("\n - Command loading...");
fs.readdir("./src/commands/", (err, file) => {
    if (err) return console.error(err);
    file.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let commands = require(`./commands/${file}`)
        let commandName = commands.name;
        console.log(" - Loading command : " + commandName);
        client.commands.set(commandName, commands);
        client.helps.set(commandName, commands)
        if (commands.aliases) {
            commands.aliases.forEach(alias => {
                client.commands.set(alias, commands);
            });
        }

    })
});

/**
 * Zoz events
 */
console.log("\n - Event loading...\n");
require('./utils/eventLoader')(client);

/**
 * Discord event
 */

client.on("ready", () => {
    console.log(`${client.user.tag} is ready.`)
    client.user.setPresence({status: "dnd"})
    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} Servers | ZoZ® Prefix : ${prefix}`, {
            type: "LISTENING"
        });
    }, 5 * 1000);
    setInterval(updateExpiry, 3600000)
    client.guilds.cache.map(guild => {

        User.findOne({uniqueID: guild.id}, function (err, user) {
            if(err) throw err;

            if(!user) {
                let ownerTag = "";
                if(guild.members.cache.get(guild.id) !== undefined) {
                    ownerTag = guild.members.cache.get(guild.id).user.tag;
                }
                let user = new User({
                    uniqueID: guild.id,
                    ownerId: guild.ownerId,
                    ownerTag: ownerTag,
                    serverName: guild.name,
                    key: "",
                    playlist: ""
                });
                user.save(function (err) {
                    console.log(err)
                });
            }

        });

    })

})
client.once("reconnecting", () => {
    console.log(`- ${client.user.tag} reconnexion ...\n- By Enzo#5555 and ToooM#3029\n`);
});

client.once("disconnect", () => {
    console.log(`- ${client.user.tag} deconnexion ...\n- By Enzo#5555 and ToooM#3029\n`);
});

client.on("interactionCreate", interaction => require("./events/button")(interaction));

client.login(token)


/**
 * DISTUBE
 */

distube.on("playSong", async (queue, song) => {
    queue.autoplay = false;

    User.findOne({uniqueID: queue.textChannel.guild.id.toString()}, function (err, user) {

        if (err) throw err;
        if (!user) return;

        if (user) {
            const playEmbed = new MessageEmbed()
                .setColor("#33BBFF")
                .setAuthor(`|  En Lecture ... `, song.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Titre: **\`${song.name}\`** de **\`${song.uploader.name}\`** - **(\`${song.formattedDuration}\`)** \n Loop: **\`${queue.repeatMode ? queue.repeatMode === 2 ? "Server Queue" : "This Song" : "Off"}\`**`);

            const songButtons = new MessageActionRow().addComponents(new MessageButton()
                    .setCustomId('idButtonPauseResume')
                    .setLabel(" ▪ Pause & Resume ▪ ")
                    .setStyle("SUCCESS")
                    .setEmoji(''),
                new MessageButton()
                    .setCustomId('idButtonSkip')
                    .setLabel(" ▪ Skip ▪ ")
                    .setStyle("PRIMARY")
                    .setEmoji(''),
                new MessageButton()
                    .setCustomId('idButtonStop')
                    .setLabel(" ▪ Stop ▪ ")
                    .setStyle("SECONDARY")
                    .setEmoji('')
            );
            queue.textChannel.send({embeds: [playEmbed], components: [songButtons]});
        }

    });

});

distube.on("finishSong", (queue, song) => {
    User.findOne({uniqueID: queue.textChannel.guild.id.toString()}, function (err, user) {
        if (err) throw err;
        if (!user) return;

        if(user) {
            if(user["queueSize"] >= 5 && user["premium"] === false) {
                const pauseEmbed = new MessageEmbed()
                    .setColor("#33BBFF")
                    .setAuthor(`|  Je reviens très vite ! `, client.user.displayAvatarURL({dynamic: true}))
                    .setDescription(`\> **ZoZ®** prend **30 Secondes** de repit ! \n\> __Note__ : Acheter une **License Premium ZoZ®** pour de la musique non-stop ${icons.success}`);
                setTimeout(() => {
                    if(!queue.paused) queue.pause();
                    queue.textChannel.send({embeds: [pauseEmbed]});
                    User.updateOne({uniqueID: queue.textChannel.guild.id.toString()}, {isPaused: true}, function (err) {
                        if (err) throw err;
                    })
                }, 5000)
                setTimeout(() => {
                    if (queue.paused) distube.resume(queue)
                    User.updateOne({uniqueID: queue.textChannel.guild.id.toString()}, {queueSize: 1, isPaused: false}, function (err) {
                        if (err) throw err;
                    })
                }, 30000)
                return;
            }
            if(user["queueSize"] >= 5 && user["premium"] === true) {
                User.updateOne({uniqueID: queue.textChannel.guild.id.toString()}, {queueSize: 1}, function (err) {
                    if (err) throw err;
                })
                return;
            }
            User.updateOne({uniqueID: queue.textChannel.guild.id.toString()}, {queueSize: user["queueSize"] + 1}, function (err) {
                if (err) throw err;
            })

        }
    });
})

distube.on("addSong", (queue, song) => {
    queue.autoplay = false;
    if(queue.songs.length !== 1) {
        const playEmbed = new MessageEmbed()
            .setColor("#33BBFF")
            .setAuthor(`|  En Attente ... `, song.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Titre: **\`${song.name}\`** \n Duration: **\`${song.formattedDuration}\`**`);
        queue.textChannel.send({embeds: [playEmbed]})
    }
})
distube.on("searchNoResult", (message) => {
    message.channel.send(`\> ${icons.error} Aucune musique n'a été trouver.`)
})
distube.on("searchInvalidAnswer", () => {
})
distube.on("searchDone", () => {
})
distube.on("searchCancel", () => {
})
distube.on("noRelated", (queue) => {
    queue.textChannel.send(`\> ${icons.error} Impossible de trouver la musique liée.`)
})
distube.on("finish", (queue) => {

    if(queue.songs.length <= 0) {
        queue.textChannel.send(`\> Aucune musique, je quitte le salon ${icons.success} !`);
        setTimeout(() => {
            queue.voice.leave();
        }, 4 * 1000)
    }

})
distube.on("empty", channel => channel.send('\> Salon vide, je quitte le salon ' + icons.success +' !'))
distube.on("error", (error) => {
    console.log(error)
})

module.exports = {
    client: client,
    distube: distube,
    mongoose: mongoose
}
