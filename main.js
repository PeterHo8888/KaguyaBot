const fs = require('fs');
const readline = require('readline');
const Discord = require('discord.js');
const {prefix, emotes, aaa} = require('./config.json');
const {token} = require('./token.json');
const util = require('./util.js');

const words = require('./words.json');

const client = new Discord.Client();
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
    //debug();
    //recursiveAsyncReadLine();
});

client.on('message', async msg => {
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
                    let escaped = (key + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
                    let regex = new RegExp(escaped, 'ig');
                    let num_matches = (msg_to_match.match(regex) || []).length;
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
