const util = require('../util.js');

module.exports = {
    name: 'user',
    description: 'User Info',
    execute(client, msg, args) {
        if (!msg.mentions.users.size) {
            let member = msg.guild.members.cache.get(msg.author.id);

            let ret_embed = util.make_embed("User Info", msg.author);
            ret_embed.addFields(
                { name: "Your username", value: msg.author.tag},
                { name: "Your ID", value: msg.author.id},
                { name: "Joined", value: member.joinedAt.toLocaleString(), inline: true },
                { name: "Registered", value: msg.author.createdAt.toLocaleString(), inline: true },
                { name: "Your avatar", value: `<${msg.author.displayAvatarURL({format:"png", dynamic:true})}>`}
            );
            msg.channel.send({embeds: [ret_embed]});
        } else {
            msg.mentions.users.map(user => {
                let member = msg.guild.members.cache.get(user.id);

                let ret_embed = util.make_embed("User Info", user);
                ret_embed.addFields(
                    { name: "Your username", value: user.tag},
                    { name: "Your ID", value: user.id},
                    { name: "Joined", value: member.joinedAt.toLocaleString(), inline: true },
                    { name: "Registered", value: user.createdAt.toLocaleString(), inline: true },
                    { name: "Your avatar", value: `<${user.displayAvatarURL({format:"png", dynamic:true})}>`}
                );
                msg.channel.send({embeds: [ret_embed]});
            });
        }
    },
};
