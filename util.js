const Discord = require('discord.js');

function get_rand(sz) {
    return Math.floor(Math.random() * sz);
}

function make_embed(title) {
    const ret_embed = new Discord.MessageEmbed()
        .setColor(0x0099ff)
        .setTitle(title)
        .setAuthor("KaguyaBot", "https://cdn.discordapp.com/avatars/772995160207917058/9e9ddb3cc2e4c4264edf5b02ede9b709.png?size=2048")
        .setThumbnail("https://cdn.discordapp.com/avatars/772995160207917058/9e9ddb3cc2e4c4264edf5b02ede9b709.png?size=2048")
        .setTimestamp();
    return ret_embed;
}

module.exports = {
    get_rand,
    make_embed
};
