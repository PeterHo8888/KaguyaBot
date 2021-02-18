const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'stop',
    description: 'Stop playing',
    execute(client, msg, args) {
        if (msg.member.voice.channel) {
            msg.member.voice.channel.join().then(conn => {
                if (conn.player.dispatcher) {
                    conn.player.dispatcher.destroy();
                    msg.react('🛑');;
                }
            });
        }
    },
};
