const util = require('../util.js');

module.exports = {
    name: 'server',
    description: 'Server Info',
    execute(client, msg, args) {
        let ret_embed = util.make_embed("Server Info");
        ret_embed.addFields(
            {name: "Server name", value: msg.guild.name},
            {name: "Server ID", value: msg.guild.id},
            {name: "Total members", value: msg.guild.memberCount.toString()}
        );
        msg.channel.send({embeds: [ret_embed]});
    },
};
