const {getSong} = require("apple-music-metadata")
const yt = require('@citoyasha/yt-search');
const index = require('../index.js')

module.exports = {
    name: "testapple",
    aliases: ["apple", "apl"],
    run: async (client, message, args) => {

        const url = args.join(" ")

        if (!url || !url.includes("https://music.apple.com/us/")) {
            message.channel.send("\> [TESTING] **Specifié un lien Apple Music valide** ")
            return;
        }

        try {

            /*
                PLAYLIST APPLE MUSIC
             */
            if(url.includes("https://music.apple.com/us/playlist/"))
            {
                ////////////////// RECHERCHE APPLE MUSIC METADATA  //////////////////
                const song = await getSong(url)
                const trackLen = song.artist["tracks"].length

                if(trackLen <= 1)
                {
                    yt.search(`${song.artist["tracks"][0].title} ${song.artist["tracks"][0].artist}`).then(function (result) {
                        const linkRes = result[0].link
                        setTimeout(function () {
                            index.distube.play(message, linkRes)
                            message.channel.send("\> [TESTING] **Apple Music** Play! ")
                        }, 1000)
                    });
                }
                else {
                    let songs = []
                    if(trackLen >= 20)
                    {
                        message.channel.send("\> [TESTING] ``WARNING APLM01 |`` Playlist > 20 -> Je joue **20 Musiques** de la **Playlist Aleatoirement !**")
                    }
                    for (let i = 0; i < 20; i++) {
                        ////////////////// RECHERCHE YT  //////////////////
                        yt.search(`${song.artist["tracks"][i].artist} ${song.artist["tracks"][i].title}`).then(function (result) {
                            const linkRes = result[0].link
                            songs.push(linkRes)
                        });
                    }
                    setTimeout(function () {
                        index.distube.playCustomPlaylist(message, songs)
                        message.channel.send("\> [TESTING] **Apple Music** Play! ")
                    }, 1000)
                }
            }

            /*
               TRACK/ALBUMS APPLE MUSIC
            */
            else if(url.includes("https://music.apple.com/us/album/"))
            {
                const song = await getSong(url)
                ////////////////// RECHERCHE YT  //////////////////
                yt.search(`${song["title"]} ${song["artist"]}`).then(function (result) {
                    const linkRes = result[0].link
                    console.log(linkRes)
                    setTimeout(function () {
                        index.distube.play(message, linkRes)
                        message.channel.send("\> [TESTING] **Apple Music** Play! ")
                    }, 1000)
                });
            }
            else
            {
                message.channel.send("\> [TESTING] ``WARNING APLM02`` | Je joue Seulement les playlist et les albums **Apple Music**")
            }
        } catch (e) {
            message.channel.send("\> [TESTING] ``ERROR APLM02``")
        }
    }
}