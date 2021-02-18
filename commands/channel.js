const util = require('../util.js');

module.exports = {
    name: 'channel',
    description: 'Channel Info',
    execute(client, msg, args) {
        let ret_embed = util.make_embed("Channel Info");
        ret_embed.addField("Channel name", msg.channel.name);
        ret_embed.addField("Channel ID", msg.channel.id);
        msg.channel.send(ret_embed);
    },
};
