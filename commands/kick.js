const util = require('../util.js');

module.exports = {
    name: 'kick',
    description: 'Kick User',
    execute(client, msg, args) {
        if (!msg.mentions.users.size) {
            msg.reply(`You need to specify somebody to kick`);
            return;
        }
        msg.reply(`Cannot punish ${args[0]}-Senpai`);
        return;

        msg.mentions.users.map(user => {
            let member = msg.guild.members.cache.get(user.id);

            let ret_embed = util.make_embed("Member Excommunicated")
                .setThumbnail(user.displayAvatarURL({format: "png", dynamic: true}))
                .setDescription(`> ${user.tag} just got expelled.`)
                .setColor('#00ff00')
                .setFooter({text:`Authorized by ${msg.author.username}`});

            msg.channel.send({embeds: [ret_embed]});

            member.kick({
                reason: '.'
            });
        });
    }
};
