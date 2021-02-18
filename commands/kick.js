module.exports = {
    name: 'kick',
    description: 'Kick User',
    execute(client, msg, args) {
        if (args.length == 0) {
            msg.reply(`You need to specify somebody to kick`);
            return;
        }
        msg.reply(`Cannot punish ${args[0]}-Senpai`);
    },
};
