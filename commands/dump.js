const fs = require('fs');

module.exports = {
    name: 'dump',
    description: 'dump',
    async execute(client, msg, args) {
        if (msg.author.tag != "Peter_#5302") {
            msg.reply("Not enough permissions");
            return;
        }

        let channel = client.channels.cache.get(args[0]);

        const sum_messages = [];
        let last_id;

        while (true) {
            let limit = 100;
            const options = {limit: 100};
            if (last_id) {
                options.before = last_id;
            }

            const messages = await channel.messages.fetch(options);
            sum_messages.push(...messages.array());
            last_id = messages.last().id;

            if (messages.size != 100 || sum_messages >= limit) {
                break;
            }
        }

        const msgs = sum_messages.filter(m => m.author.id === args[1]);
        let buffer = "";
        msgs.forEach(m => {
            buffer += `${m.content}\n`;
        });
        //console.log(buffer);
        fs.writeFileSync(`${args[1]}.txt`, buffer);
        msg.reply("Done dumping!");
    },
};
