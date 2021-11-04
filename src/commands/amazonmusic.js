const yt = require('@citoyasha/yt-search');
const index = require('../index.js')
const {getData} = require("amazon-music-info")

module.exports = {
    name: "testamazonmusic",
    aliases: ["amazonmusic", "azm"],
    run: async (client, message, args) => {

        const url = args.join(" ")
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

                console.log(res.items.length)
                if (res.items.length <= 1) {
                    const title = res.items[0].name.toString();
                    const artist = res.items[0].artist.toString();
                    yt.search(`${title} ${artist}`).then(function (result) {
                        const linkRes = result[0].link

                        setTimeout(function () {
                            index.distube.play(message, linkRes)
                            message.channel.send("\> [TESTING] **Amazon Music** Play! ")
                        }, 1000)
                    })
                } else {
                    let songs = []
                    for (let i = 0; i < res.items.length; i++) {
                        const title = res.items[i].name.toString();
                        const artist = res.items[i].artist.toString();

                        ////////////////// RECHERCHE YT  //////////////////
                        yt.search(`${title} ${artist}`).then(function (result) {
                            const linkRes = result[0].link
                            songs.push(linkRes)
                        });
                    }
                    setTimeout(function () {
                        index.distube.playCustomPlaylist(message, songs)
                        message.channel.send("\> [TESTING] **Amazon Music** Play! ")
                    }, 1000)
                }
            })
        } catch (e) {
            message.channel.send("\> [TESTING] ``ERROR AMZNM01``")
        }
    }
}