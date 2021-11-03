const {getSong} = require("apple-music-metadata")
const search = require('youtube-search');
const index = require('../index.js')

module.exports = {
    name: "testapple",
    aliases: ["apple"],
    run: async (client, message, args) => {

        const url = args.join(" ")

        var opts = {
            maxResults: 10,
            key: 'AIzaSyBak9c17Ng-N2xf8Rl1uCHRb1iB_aN5EJs'
        };

        if (url.includes("playlist")) {
            message.channel.send("\> [TESTING] **Apple Music Playlist** n'est pas supporté pour le moment | Attendez les prochaines **Mises a Jour**")
            return;
        } else if (!url || !url.includes("https://music.apple.com/us/album/")) {
            message.channel.send("\> [TESTING] **Specifié un lien Apple Music valid** ")
            return;
        }

        try {

            ////////////////// RECHERCHE APPLE MUSIC METADATA  //////////////////
            const song = await getSong(url)
            console.log(`${song["title"].toString()} by ${song["artist"].toString()}`)

            ////////////////// RECHERCHE YT  //////////////////
            search(`${song["title"].toString()} by ${song["artist"].toString()}`, opts, function (err, results) {
                if (err) return console.log(err);
                const linkRes = results[0].link
                index.distube.play(message, linkRes)
            });
        } catch (e) {
            message.channel.send("\> [TESTING] ``ERROR APLM01``")
        }
    }
}