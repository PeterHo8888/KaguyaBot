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
                let data = JSON.stringify(r[user.id], null, 4);
                let member = msg.guild.members.cache.get(user.id);
                msg.channel.send(`"${member.displayName}": ${data}`);
            }
        });
    },
};
