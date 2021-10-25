const fetch = require("node-fetch");
const { CustomPlugin, Song, Playlist } = require("distube");
const urlRegex = /^(https?:\/\/)?(?:www\.)?deezer\.com\/([a-z][a-z]\/)?(track|album|playlist)\/(\d+)$/gm;
const API_URL = "https:\/\/api.deezer.com\/";
const SUPPORTED_TYPES = ["album", "playlist", "track"];

module.exports = class DeezerPlugin extends CustomPlugin {
    constructor(options = {}) {
        super();
        this.parallel = typeof options.parallel === "boolean" ? options.parallel : true;
        this.emitPlaySongAfterFetching = !!options.emitPlaySongAfterFetching;
    }

    validate(url) {
        if (typeof url !== "string" || !url.includes("deezer") || !SUPPORTED_TYPES.some(type => url.includes(type))) return false;
        if (!urlRegex.test(url)) return false;
        return true;
    }

    async play(voiceChannel, url, member, textChannel, skip, unshift) {
        const DT = this.distube;
        let urlId = url.split("/");
        urlId = urlId[urlId.length - 1];

        let resolvedUrl;
        if (url.includes("track")) {
            resolvedUrl = `${API_URL}track\/${urlId}`;
        } else if (url.includes("playlist")) {
            resolvedUrl = `${API_URL}playlist\/${urlId}`;
        } else if (url.includes("album")) {
            resolvedUrl = `${API_URL}album\/${urlId}`;
        }

        const rawData = await fetch(resolvedUrl).then((res) => res.json());

        if (!rawData) throw new Error(`[DeezerPlugin] Cannot find any data for "${url}" on Deezer.`);

        if (rawData.type === "track") {
            const query = `${rawData.title} ${rawData.artist.name}`;
            const result = await this.search(query);
            if (!result) throw new Error(`[DeezerPlugin] Cannot find "${query}" on YouTube.`);
            await DT.playVoiceChannel(voiceChannel, result, { member, textChannel, skip });
        } else {
            const playlist = resolvePlaylist(rawData, url, member);
            let firstSong;
            while (!firstSong && playlist.songs.length) {
                const result = await this.search(playlist.songs.shift());
                if (!result) continue;
                firstSong = new Song(result, member)._patchPlaylist(playlist);
            }

            if (!firstSong && !playlist.songs.length) throw new Error(`[DeezerPlugin] Cannot find any tracks of "${playlist.name}" on YouTube.`);
            let queue = DT.getQueue(voiceChannel);

            const fetchTheRest = async () => {
                if (playlist.songs.length) {
                    if (this.parallel) {
                        playlist.songs = await Promise.all(playlist.songs.map(query => this.search(query)));
                    } else {
                        for (const i in playlist.songs) {
                            playlist.songs[i] = await this.search(playlist.songs[i]);
                        }
                    }
                    playlist.songs = playlist.songs.filter(r => r)
                        .map(r => new Song(r, member)._patchPlaylist(playlist));
                    queue.addToQueue(playlist.songs, skip ? 1 : unshift ? 2 : -1);
                }
                playlist.songs.unshift(firstSong);
            };

            if (queue) {
                queue.addToQueue(firstSong, skip || unshift ? 1 : -1);
                if (skip) queue.skip();
                await fetchTheRest(unshift);
                if (!skip) DT.emit("addList", queue, playlist);
            } else {
                //queue = await DT._newQueue(voiceChannel, firstSong, textChannel);
                queue = await DT.queues.create(voiceChannel, firstSong, textChannel);
                queue.addToQueue(firstSong, skip || unshift ? 1 : -1);
                if (queue === true) return;
                if (!this.emitPlaySongAfterFetching) DT.emit("playSong", queue, firstSong);
                await new Promise(resolve => {
                    const check = setInterval(() => {
                        if (Array.isArray(queue.songs) && queue.songs[0]?.streamURL) resolve(clearInterval(check));
                    }, 500);
                });
                await fetchTheRest();
                if (this.emitPlaySongAfterFetching) DT.emit("playSong", queue, firstSong);
            }
        }
    }

    async search(query) {
        try {
            return (await this.distube.search(query, { limit: 1 }))[0];
        } catch { return null }
    }
};

const resolvePlaylist = (rawData, url, member) => {
    const songs = rawData.tracks.data.map(item => {
        const track = item;
        if (track.type !== "track") return null;
        return `${track.title} ${track.artist.name}`;
    }).filter(Boolean);
    if (!songs.length) throw new Error(`[DeezerPlugin] \`${rawData.title}\` does not contains any tracks.`)
    const thumType = `${rawData.type === "playlist" ? "picture" : "cover"}`;
    return new Playlist({
        name: rawData.title,
        thumbnail: `${rawData}.${thumType}_xl` || `${rawData}.${thumType}_big` || `${rawData}.${thumType}_medium` || `${rawData}.${thumType}_small` || `${rawData}.${thumType}` || "",
        url: rawData.link || url,
        songs
    }, member);
};