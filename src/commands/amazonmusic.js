const search = require('youtube-search');
const index = require('../index.js')
const axios = require("axios")
const {getData} = require("amazon-music-info")

module.exports = {
    name: "testamazonmusic",
    aliases: ["amazonmusic"],
    run:  async (client, message, args) => {

        const url = args.join(" ")

        var opts = {
            maxResults: 10,
            key: 'AIzaSyBak9c17Ng-N2xf8Rl1uCHRb1iB_aN5EJs'
        };
        let link;
        let trackId;
        let finalLink;

        //// DECOMPOSITION ET VERIFICATON URL ////
        const oldUrl = url.slice(23)
        const domainName = url.slice(0, 24)
        let newUrl1 = domainName.replace(`${domainName}`, "https://music.amazon.com") + oldUrl
        splitUrl = newUrl1.split("?")
        getIDTrack = newUrl1.split("trackAsin=")
        link = splitUrl[0]
        trackId = getIDTrack[1]
        finalLink = link + "?trackAsin=" + trackId

        if (!finalLink.startsWith("https://music.amazon.com/albums/")) {
            message.channel.send("\> [TESTING] Entrer un lien **Amazon Musique** Valide")
        }

        try {

            ////////////////// RECHERCHE AMAZON MUSIC METADATA  //////////////////
            getData(finalLink.toString()).then(function (res) {

                let songs = []

                for (let i = 0; i < res.items.length; i++) {
                    const title = res.items[i].name.toString();
                    const artist = res.items[i].artist.toString();

                    ////////////////// RECHERCHE YT  //////////////////
                    search(`${title} ${artist}`, opts, function (err, results) {
                        const linkRes = results[0].link
                        songs.push(linkRes)

                    });
                }
                setTimeout(function() {
                    index.distube.playCustomPlaylist(message, songs)
                    message.channel.send("\> [TESTING] **Amazon Music** Play Song Now ! ")
                }, 5000)
            })
        } catch (e) {
            message.channel.send("\> [TESTING] ``ERROR AMZNM01``")
        }
    }
}