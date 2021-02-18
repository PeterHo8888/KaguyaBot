const util = require('../util.js');

module.exports = {
    name: 'user',
    description: 'User Info',
    execute(client, msg, args) {
        let ret_embed = util.make_embed("User Info");
        ret_embed.addField("Your username", msg.author.username);
        ret_embed.addField("Your ID", msg.author.id);
        ret_embed.addField("Your avatar", `<${msg.author.displayAvatarURL({format:"png", dynamic:true})}>`);
        msg.channel.send(ret_embed);
    },
};
