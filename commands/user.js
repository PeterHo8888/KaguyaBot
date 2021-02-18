const util = require('../util.js');

module.exports = {
    name: 'user',
    description: 'User Info',
    execute(client, msg, args) {
        let member = msg.guild.members.cache.get(msg.author.id);

        let ret_embed = util.make_embed("User Info", msg.author);
        ret_embed.addField("Your username", msg.author.tag);
        ret_embed.addField("Your ID", msg.author.id);
        ret_embed.addFields(
            { name: "Joined", value: member.joinedAt.toLocaleString(), inline: true },
            { name: "Registered", value: msg.author.createdAt.toLocaleString(), inline: true }
        );
        ret_embed.addField("Your avatar", `<${msg.author.displayAvatarURL({format:"png", dynamic:true})}>`);
        msg.channel.send(ret_embed);
    },
};
