const {Client, Intents, Collection} = require("discord.js");
const { DisTube } = require("distube")
const {prefix, token} = require("./config.json");
const mongoose = require("mongoose");
const {cron} = require("./utils/cron");
const fs = require("fs");
const { SpotifyPlugin } = require("@distube/spotify");
const DeezerPlugin = require("./utils/deezer");
const {User} = require("./store/user/User");
const MessageEmbed = require("discord.js");

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES]})
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
})
client.once("reconnecting", () => {
    console.log(`- ${client.user.tag} reconnexion ...\n- By Enzo#5555 and ToooM#3029\n`);
});

client.once("disconnect", () => {
    console.log(`- ${client.user.tag} deconnexion ...\n- By Enzo#5555 and ToooM#3029\n`);
});
client.login("OTAxNzY1NTk1OTEyMDk3ODgy.YXUoqA.J2cK3Ps1M_VWLirdVTJn7caF7Y8")


/**
 * DISTUBE
 */

 distube.on("playSong", async (queue, song) => {
    queue.autoplay = false;

    User.findOne({uniqueID: queue.textChannel.guild.id.toString()}, function (err, user) {

        if(err) throw err;
        if(!user) return;

        if(user) {
            if(user["queueSize"] >= 5 && user["premium"] === false) {
                if(!queue.paused) distube.pause(queue);
                queue.textChannel.send(`\> Interuption **ZoZ® Music** pendant 30 secondes | __Conseil:__ _Aller prendre l'air !_\n\> Buy **Premium ZoZ® License** for non-stop music <:Error:888743744277463141>`);
                setTimeout(() => {
                    if(queue.paused) distube.resume(queue)
                    User.updateOne({uniqueID: queue.textChannel.guild.id.toString()}, {queueSize: 1}, function (err, docs) {
                        if(err) throw err;
                    })
                    const playEmbed = new MessageEmbed()
                     .setColor("33BBFF")
                     .setTitle("--> Et c'est repartit ! <:Song:888743744197763072>")
                     .setDescirption(`\`Titre: ${song.name}\` - \`${song.formattedDuration}\` | Pour : ${song.user} \n <:Loop:888743744201957456> Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\``);
                    
                    queue.textChannel.send(playEmbed);
                }, 30000)
            } else {
                User.updateOne({uniqueID: queue.textChannel.guild.id.toString()}, {queueSize: user["queueSize"] + 1}, function (err, docs) {
                    if(err) throw err;
                })
                const playEmbed = new MessageEmbed()
                     .setColor("33BBFF")
                     .setTitle("<:Song:888743744197763072> Joue")
                     .setDescirption(`\`Titre: ${song.name}\` - \`${song.formattedDuration}\` | Pour : ${song.user} \n <:Loop:888743744201957456> Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\``);

                queue.textChannel.send(playEmbed);
            }
        }

    });

});

distube.on("addSong", (queue, song) => {
    queue.autoplay = false;
    queue.textChannel.send(`\> <:Song:888743744197763072> En attente \`${song.name}\` - \`${song.formattedDuration}\``)
})
distube.on("searchNoResult", (message) => {
    message.channel.send(`\> <:Error:888743744277463141> Aucune musique n'a été trouver.`)
})
distube.on("searchInvalidAnswer", () => {})
distube.on("searchDone", () => {})
distube.on("searchCancel", () => {})
distube.on("noRelated", (queue) => {queue.textChannel.send(`\> <:Error:888743744277463141> Impossible de trouver la musique liée.`)})
distube.on("finish", (queue) => {
    queue.textChannel.send(`\> Aucune musique, je quitte le salon <:Sucess:888743744105492541> !`);
    setTimeout(() => {
        queue.voice.leave();
    }, 4 *1000)

})
distube.on("empty", channel => channel.send('\> Salon vide, je quitte le salon <:Sucess:888743744105492541> !'))
distube.on("error", (error) => {
    console.log(error)
})

module.exports = {
    client: client,
    distube: distube,
    mongoose: mongoose
}