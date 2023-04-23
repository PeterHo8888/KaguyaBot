const util = require('../util.js');

module.exports = {
    name: 'channel',
    description: 'Channel Info',
    execute(client, msg, args) {
        let ret_embed = util.make_embed("Channel Info");
        ret_embed.addFields(
            {name: "Channel name", value: msg.channel.name},
            {name: "Channel ID", value: msg.channel.id}
        );
        msg.channel.send({embeds: [ret_embed]});
    },
};
