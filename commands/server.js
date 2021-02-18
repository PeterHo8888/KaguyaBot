const util = require('../util.js');

module.exports = {
    name: 'server',
    description: 'Server Info',
    execute(client, msg, args) {
        let ret_embed = util.make_embed("Server Info");
        ret_embed.addField("Server name", msg.guild.name);
        ret_embed.addField("Server ID", msg.guild.id);
        ret_embed.addField("Total members", msg.guild.memberCount);
        msg.channel.send(ret_embed);
    },
};
