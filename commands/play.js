const config = require('../config.json');
const ytdl = require('ytdl-core');
//const {getInfo} = require('ytdl-getinfo');
const ytpl = require('ytpl');
const {
    NoSubscriberBehavior,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    entersState,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    joinVoiceChannel,
} = require('@discordjs/voice')

//var playlist_queue = require('../queue.js').play_queue;

function get_next_song() {
    return global.playlist_queue.shift();
}
function get_queue_len() {
    return global.playlist_queue.length;
}
function print_queue() {
    for (const q of global.playlist_queue) {
        console.log(`\t${q.url}`);
    }
}

function setup_player(chan, bot_id) {

    if (global.player)
        return global.player;

    global.player = createAudioPlayer();
    global.player.on('subscribe', async () => {
        //chan.send("INFO: Subscribed voice connection to player");
        //await msg.reply(`:thumbsup: Now Playing ***${video.title}***`);
    });

    player.addListener("stateChange", (oldOne, newOne) => {
        console.log(`Audio player transitioned from ${oldOne.status} to ${newOne.status}`);

        if (newOne.status == "playing") {
            global.msg.react('✅');
        }

        if (get_queue_len() == 0) {
            if (newOne.status == "idle" || newOne.status == "autopaused") {
                const bot_reactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(bot_id));
                try {
                    for (const reaction of bot_reactions.values()) {
                        reaction.users.remove(bot_id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }
                global.msg.react('🛑');
            }
        }

        if (newOne.status == "idle" && oldOne.status == "playing") {
            if (get_queue_len() != 0)
                play_queue(player);
        }
    });

    player.on('error', error => {
        console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
    });

    return global.player;
}

function setup_subscription(conn, player) {
    if (!global.subs)
        global.subs = conn.subscribe(player);
}

async function play_queue(player) {
    //print_queue();
    if (get_queue_len() == 0)
        return;

    song = get_next_song();

    console.log(song);

    f = await dl_url(song);

    if (!f) {
        global.msg.reply(`Invalid URL found: ${song}`);
        return play_queue(player);
    }

    global.audiores = createAudioResource(f, {
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
    });

    global.audiores.volume.setVolume(config["vol"] / 100.0);

    player.play(audiores);

    //entersState(player, AudioPlayerStatus.Playing, 5000);


}

async function dl_url(url)
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
        return file;
    }
    console.log(`Donewith ${url}`);
    return null;
}

async function play(player, msg, args) {
    player.unpause();
    player.stop();

    url = args[0];

    if (url == "lofi")
        url = "https://www.youtube.com/watch?v=jfKfPfyJRdk";
    //url = "https://www.youtube.com/watch?v=5qap5aO4i9A";
    global.playlist_queue = [];

    try {
        console.log(args[0]);

        // Three types: playlist, video, playlist+video
        // Playlist+video should be treated as video (for now)

        if (ytdl.validateURL(url)) {
            // Do nothing, process as a regular video
            // Definitely not thread-safe :')
            global.playlist_queue.push(url);
        } else if (ytpl.validateID(url)) {
            playlist = await ytpl(url);

            // Queue all videos
            for (const item of playlist.items) {
                console.log(item.shortUrl);
                global.playlist_queue.push(item.shortUrl)
            };
        }
        global.msg = msg;
        play_queue(player, msg, global.playlist_queue);
    } catch (error) {
        msg.reply(error.stack);
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

        voiceChannel = msg.member.voice.channel;
        if (voiceChannel && voiceChannel.joinable) {
            const permissions = voiceChannel.permissionsFor(msg.client.user);
            const conn = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guild.id,
                adapterCreator: msg.guild.voiceAdapterCreator
            });

            try {
                entersState(conn, VoiceConnectionStatus.Ready, 5_000);
                player = setup_player(msg.channel, client.user.id);
                setup_subscription(conn, player);
            } catch (error) {
                conn.destroy();
                throw error;
            }

            play(player, msg, args);

        } else {
            msg.reply("I can't join your voice channel!");
        }
    },
};
