const util = require('../util.js');

module.exports = {
    name: 'user',
    description: 'User Info',
    execute(client, msg, args) {
        if (!msg.mentions.users.size) {
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
        } else {
            msg.mentions.users.map(user => {
                let member = msg.guild.members.cache.get(user.id);

                let ret_embed = util.make_embed("User Info", user);
                ret_embed.addField("Your username", user.tag);
                ret_embed.addField("Your ID", user.id);
                ret_embed.addFields(
                    { name: "Joined", value: member.joinedAt.toLocaleString(), inline: true },
                    { name: "Registered", value: user.createdAt.toLocaleString(), inline: true }
                );
                ret_embed.addField("Your avatar", `<${user.displayAvatarURL({format:"png", dynamic:true})}>`);
                msg.channel.send(ret_embed);
            });
        }
    },
};
