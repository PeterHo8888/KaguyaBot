const config = require('../config.json');
const ytdl = require('ytdl-core');

async function play(conn, msg, args) {
    let file;
    if (args[0] == "ram") {
        console.log("playing ram");
        file = "ram.m4a";
    } else {
        video_info = await ytdl.getInfo(args[0]);
        if (video_info.videoDetails.isLiveContent) {
            // Live video does not always have
            // "highest" stream audio quality
            file = await ytdl(args[0]);
        } else {
            file = await ytdl(args[0], {
                filter: 'audioonly',
                highWaterMark: 1 << 25
            });
        }
        console.log(args[0])
    }

    const dispatcher = conn.play(file);
    dispatcher.setVolumeLogarithmic(config["vol"] / 200.0);
    dispatcher.on('error', console.error);
    dispatcher.on('start', () => {
        msg.react('✅');
    });
    dispatcher.on('debug', console.debug);
    dispatcher.on('finish', () => {
        //msg.react('🛑');
    });
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
