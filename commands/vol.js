const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'vol',
    description: 'Set volume',
    execute(client, msg, args) {
        if (args.length == 0) {
            //msg.reply("format is:\n" + config.prefix + "vol [percent]");
            msg.reply("current vol is: " + config["vol"] + "%");
            return;
        }

        let val = parseInt(args[0]);
        if (Number.isNaN(val) || val < 0 || val > 100) {
            msg.reply(args[0] + " is not a valid int on [0, 100]!");
            return;
        }

        config["vol"] = args[0];
        fs.writeFileSync("config.json", JSON.stringify(config, null, 4));

        if (msg.member.voice.channel) {
            msg.member.voice.channel.join().then(conn => {
                if (conn.player.dispatcher) {
                    conn.dispatcher.setVolumeLogarithmic(config["vol"] / 200.0);
                }
            });
        }
        msg.react('✅');
    },
};
