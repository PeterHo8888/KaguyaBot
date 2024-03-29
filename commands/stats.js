const util = require('../util.js');

module.exports = {
    name: 'stats',
    description: 'stats!',
    async execute(client, msg, args) {
        if (!msg.mentions.users.size) {
            msg.reply("you must specify a user!");
        }

        const r = require('../words.json');

        msg.mentions.users.map(user => {
            if (!r[user.id]) {
                msg.channel.send("No data for " + user.username);
            } else {
                let data = r[user.id];

                let member = msg.guild.members.cache.get(user.id);
                let ret_embed = util.make_embed(member.displayName + "'s word counter", member.user);
                for (word in data)
                    ret_embed.addFields({name: word, value: data[word].toString()});
                msg.channel.send({embeds: [ret_embed]});
            }
        });
    },
};
