const config = require('../config.json');
const ytdl = require('ytdl-core');
//const {getInfo} = require('ytdl-getinfo');
const ytpl = require('ytpl');

var playlist_queue = require('../queue.js').play_queue;

function play_queue(conn, msg, queue) {
    const dispatcher = conn.play(queue.shift());
    dispatcher.setVolumeLogarithmic(config["vol"] / 200.0);
    dispatcher.on('error', console.error);
    dispatcher.on('start', () => {
        msg.react('✅');
    });
    dispatcher.on('debug', console.debug);
    dispatcher.on('finish', () => {
        //msg.react('🛑');
        if (queue.length != 0) {
            play_queue(conn, msg, queue);
        }
    });
}

async function push_dl_url(url, queue)
{
    if (ytdl.validateURL(url)) {
        video_info = await ytdl.getInfo(url);

        let file;
        if (video_info.videoDetails.isLiveContent) {
            // Live video does not always have
            // "highest" stream audio quality
            file = await ytdl(url);
        } else {
            file = await ytdl(url, {
                filter: 'audioonly',
                highWaterMark: 1 << 25
            });
        }
        queue.push(file);
    }
}

async function play(conn, msg, args) {
    let file;
    if (args[0] == "ram") {
        console.log("playing ram");
        file = "ram.m4a";
    } else {

        try {
            url = args[0];

            // Three types: playlist, video, playlist+video
            // Playlist+video should be treated as video (for now)

            if (ytdl.validateURL(url)) {
                // Do nothing, process as a regular video
                await push_dl_url(url, playlist_queue);
                console.log(playlist_queue.length);
            } else if (ytpl.validateID(url)) {
                playlist = await ytpl(url);

                // Queue all videos

                // Hack to at least queue 1
                let queued = 0;
                for (const item of playlist.items) {
                    //console.log(item.shortUrl);
                    if (queued === 0)
                        await push_dl_url(item.shortUrl, playlist_queue);
                    else
                        push_dl_url(item.shortUrl, playlist_queue);
                    ++queued;
                };
            }
            console.log(args[0]);
            play_queue(conn, msg, playlist_queue);
        } catch (error) {
            msg.reply(error.stack);
        }
    }

}
module.exports = {
    name: 'play',
    description: 'Play youtube link',
    execute(client, msg, args) {
        if (args.length == 0) {
            msg.reply("format is:\n" + config.prefix + "play [youtube-url]");
            return;
        }

        if (msg.member.voice.channel) {
            msg.member.voice.channel.join().then(conn => {
                play(conn, msg, args);
            });
        } else {
            msg.reply("I need to know what voice channel!");
        }
    },
};
