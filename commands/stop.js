module.exports = {
    name: 'stop',
    description: 'Stop playing',
    execute(client, msg, args) {
        global.playlist_queue = [];
        if (global.player) {
            global.player.unpause();
            global.player.stop();
        } else {
            msg.reply("Nothing is playing?");
        }
    }
};
