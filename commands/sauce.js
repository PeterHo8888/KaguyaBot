const util = require('../util.js');

module.exports = {
    name: 'sauce',
    description: 'Sauce plz',
    execute(client, msg, args) {
        let ret_embed = util.make_embed("Image Sauce");
        ret_embed.addField("Not implemented", "undefined");

        msg.channel.send(ret_embed);
    },
};
