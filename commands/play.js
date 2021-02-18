const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play youtube link',
    execute(client, msg, args) {
        if (args.length == 0) {
            msg.reply("format is:\n%play [youtube-url]");
            return;
        }

        if (msg.member.voice.channel) {
            msg.member.voice.channel.join().then(conn => {
                let file;
                if (args[0] == "ram") {
                    console.log("playing ram");
                    file = "ram.m4a";
                } else {
                    file = ytdl(args[0]);
                }
                const dispatcher = conn.play(file);
                dispatcher.setVolumeLogarithmic(config["vol"] / 200.0);
                dispatcher.on('error', console.error);
                dispatcher.on('start', () => {
                    msg.react('✅');
                });
                dispatcher.on('finish', () => {
                    //msg.react('🛑');
                });
            });
        } else {
            msg.reply("I need to know what voice channel!");
        }
    },
};
