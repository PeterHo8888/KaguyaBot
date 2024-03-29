const fs = require('fs');
const readline = require('readline');
const Discord = require('discord.js');
const {prefix, emotes, aaa} = require('./config.json');
const {token} = require('./token.json');
const util = require('./util.js');

const words = require('./words.json');

//const client = new Discord.Client();

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildVoiceStates
    ],
    presence: {
        activities: [{
            name: "reee",
            type: Discord.ActivityType.Watching
        }]
    }
});
//client.on('debug', console.debug);
client.commands = new Discord.Collection();

//channels = {};

function update_commands() {
    tmp = new Discord.Collection();
    const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    try {
        for (const file of commandfiles) {
            const command = require(`./commands/${file}`);
            tmp.set(command.name, command);
        }
        client.commands = tmp;
    } catch (error) {
        console.log(error);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function debug() {
    let guild = client.guilds.cache.get('765311035048984596');
    channels = {};
    guild.channels.cache.forEach(channel => {
        channels[channel.name] = channel.id;
    });
    //for (key in channels) {
    //    console.log("{" + key + ", " + channels[key] + "}");
    //}
    //client.channels.cache.get(channels['🍚student-council-room']).createInvite({unique: true}).then(invite => { console.log(invite.code) });
    let roles = guild.roles.cache.find(role => role.name === "auditor");
    let president = guild.roles.cache.get('765311035048984596');
    //let peter = guild.members.fetch('191668782777892864').then(obj => {console.log(obj) });
    //let buhao = guild.members.fetch('808108637771661372').then(obj => { obj.roles.set([roles]) });
    //console.log(peter);
}

client.once('ready', () => {
    update_commands();
    console.log('KaguyaBot is online!');
    monitor_temp();
    //debug();
    //recursiveAsyncReadLine();
});

client.on('messageDelete', async msg => {
    try {
        if (msg.author.username == "KaguyaBot") {
            msg.channel.send("fuck you");
            //msg.channel.send(msg.content + ", fuck you");
        } else {
            // Log all deleted messages
            fs.appendFileSync("deleted.json", JSON.stringify(msg, null, 4));
        }
    } catch (error) {
        console.error(error);
    }
});

client.on('messageCreate', async msg => {
    try {
        if (msg.author.bot) {
            return;
        }

        // Repeated `-` commands
        if (msg.content.startsWith('-') && msg.channel.name != "voice-chat") {
            repeat_text(msg);
        }

        if (msg.channel.name == '🍚student-council-room') {
            //let member = msg.guild.members.cache.get(msg.author.id);
            //console.log(`${member.displayName}` + ': ' + msg.content);
        }

        // word counters
        if (words[msg.author.id]) {
            let author_arr = words[msg.author.id];
            let msg_to_match = msg.content.toLowerCase();
            for (key in author_arr) {
                if (author_arr.hasOwnProperty(key)) {
                    // create regex with key but add slashes for '"\NUL
                    let escaped = (key + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
                    let regex = new RegExp(escaped, 'ig');
                    let num_matches = (msg_to_match.match(regex) || []).length;

                    // subtract out matches belonging to emotes
                    let emote_escaped = "<:[^<:]*" + escaped + "[^:>]*:\\d+>";
                    let emote_regex = new RegExp(emote_escaped, 'ig');
                    let emote_num_matches = (msg_to_match.match(emote_regex) || []).length;

                    num_matches -= emote_num_matches;

                    if (num_matches > 0) {
                        let val = author_arr[key] + num_matches;
                        author_arr[key] = val;
                        if (util.get_rand(5) == 0) {
                            let member = msg.guild.members.cache.get(msg.author.id);
                            msg.channel.send(`${member.displayName}` + "'s `" + key + "` counter: "+ `${val}`);
                        }
                        fs.writeFileSync("words.json", JSON.stringify(words, null, 4));
                    }
                }
            }
        }

        // Bail on no prefix
        if (!msg.content.startsWith(prefix))
            return;

        if (util.get_rand(300) == 0) {
            let member = msg.guild.members.cache.get(msg.author.id).displayName;
            storage_channels = ["list of excludes"];
            if (!storage_channels.some(v => msg.channel.name.includes(v))) {
                // There's at least one
                if (member == "<insert here>") {
                    //const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'thumbsdown');
                    msg.react('👎');
                } else {
                    //console.log(member);
                }
            }
        }

        // Split by whitespace, pop command
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command))
            return;

        // Anything else
        client.commands.get(command).execute(client, msg, args);
    } catch (error) {
        console.error(error);
        msg.reply(`error executing command\n${error}`);
    }
});

client.login(token);

//var channels = {};
//var selected_guild;
//var selected_channel;

var recursiveAsyncReadLine = function() {
    rl.question("> ", function(text) {
        //const args = text.trim().split(/ +/);
        //const command = args.shift().toLowerCase();
        //switch (command) {
        //case "update":
        //    update_commands();
        //    break;
        //case "list":
        //    let guild = client.guilds.cache.get('765311035048984596');
        //    //let guild = client.guilds.cache.get('771609153205567529');
        //    channels = {};
        //    guild.channels.cache.forEach(channel => {
        //        channels[channel.name] = channel.id;
        //    });
        //    for (key in channels) {
        //        console.log("{" + key + ", " + channels[key] + "}");
        //    }
        //    break;
        //case "send":
            //client.channels.cache.get(channels["student-council-room"]).send(text.slice(command.length));
        //    break;
        //}
        //client.channels.cache.get(channels["🍚student-council-room"]).send(text);
        client.channels.cache.get(channels["storage-3"]).send(text);
        recursiveAsyncReadLine();
    });
};

function repeat_text(msg) {
    const word = msg.content.slice(1).trim();
    if (word === "a") {
        msg.channel.send(aaa[util.get_rand(aaa.length)]);
        return;
    } else {
        if (word.length == 0)
            return;
        let ret = word;
        let amount = util.get_rand(25) + 20;
        ret += word.slice(-1).repeat(amount);
        msg.channel.send(ret);
    }
}

function monitor_temp() {
    (function set_temperature_status() {
        try {
            const {exec} = require('child_process');
            exec('vcgencmd measure_temp', (err, stdout, stderr) => {
                //client.user.setActivity(stdout, {type: "WATCHING"});
                client.user.setPresence({
                    activities: [{
                        name: stdout,
                        type: Discord.ActivityType.Watching
                    }]
                });
            });
            setTimeout(set_temperature_status, 10000);
        } catch (error) {
            console.error(error);
        }
    })();
}

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
