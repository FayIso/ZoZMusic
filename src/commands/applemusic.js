const {getSong} = require("apple-music-metadata")
const search = require('youtube-search');
const index = require('../index.js')

module.exports = {
    name: "am",
    aliases: ["apple"],
    run: async (client, message, args) => {

        const url = args.join(" ")

        var opts = {
            maxResults: 10,
            key: 'AIzaSyD3J-tDYt9pKXmTs0UNGIxRpRRxRlulaus'
        };

        if (url.includes("playlist")) {
            message.channel.send("**Apple Music Playlist** n'est pas supporté pour le moment | Attendez les prochaines **Mises a Jour**")
            return;
        }

        const song = await getSong(url)
        console.log(`${song["title"].toString()} by ${song["artist"].toString()}`)
        search(`${song["title"].toString()} by ${song["artist"].toString()}`, opts, function (err, results) {
            if (err) return console.log(err);
            const linkRes = results[0].link
            index.distube.play(message, linkRes)
        });
    }
}