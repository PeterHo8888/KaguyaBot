module.exports = {
    name: 'remind',
    description: 'Remind Me!',
    async execute(client, msg, args) {
        if (args.length == 0) {
            msg.reply("format is:\n!remind XX[smh] Text here");
            return;
        }

        let time = args[0];
        let multiplier = 1000;
        let type = "seconds";
        switch (time.slice(-1)) {
        case 's':
            multiplier = 1000;
            type = "seconds";
            break;
        case 'm':
            multiplier = 60000;
            type = "minutes";
            break;
        case 'h':
            multiplier = 3600000;
            type = "hours";
            break;
        default:
            msg.reply("Could not understand time spec.");
            return;
        }

        let delay = time.slice(0, -1) * multiplier;
        msg.reply("Reminder set for " + time.slice(0, -1) + " " + type);
        setTimeout(reminder, delay);

        function reminder() {
            msg.reply("\n**\*\*\*REEEEEEEEEEEEEEMINDER\*\*\***\n" +
                        args.slice(1).join(' '));
        }
    },
};
