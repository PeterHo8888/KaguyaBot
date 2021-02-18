const fs = require('fs');
const util = require('../util.js')

module.exports = {
    name: 'help',
    description: 'List Commands',
    execute(client, msg, args) {
        let {commands} = msg.client;

        let ret_embed = util.make_embed("Command List");

        for (var [key, func] of commands.entries()) {
            ret_embed.addField("%" + key, func.description, false);
            //ret += "!" + key + ' - ' + func.description + "\n";
        }
        msg.channel.send(ret_embed);
    },
};
