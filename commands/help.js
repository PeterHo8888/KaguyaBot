const fs = require('fs');
const util = require('../util.js')
const config = require('../config.json')

module.exports = {
    name: 'help',
    description: 'List Commands',
    execute(client, msg, args) {
        let {commands} = msg.client;

        let ret_embed = util.make_embed("Command List");

        for (var [key, func] of commands.entries()) {
            ret_embed.addFields({name: config.prefix + key, value: func.description, inline: false});
        }
        msg.channel.send({embeds: [ret_embed]});
    },
};
