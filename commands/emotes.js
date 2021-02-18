const config = require('../config.json');
const util = require('../util.js');

const emotes = [
    "<:okawaiikoto:767248957155049532>",
    "<:kaguyaangry:768149089413627914>",
    "<:kaguyasure:768724842450518046>",
    "<:kaguyagasp:770095718198149160>",
    "<:chikacontinue:769821314738552843>",
    "<:kaguyaupset:769829187074654208>",
    "<:chikahappy:769835291476754432>",
    "<:kaguyastimulated:769838489612582922>",
    "<:ishigamisad:770097378039955487>",
    "<:kaguyastare:770143091130499092>",
    "<:chikablank:771056832605192212>",
    "<:kaguyatea:771400256037716009>",
    "<:kaguyascared:771400516369776660>",
    "<:ishigamimouth:771401213702701128>",
    "<:kaguyathink:771532105976250368>",
    "<:dio:771587947668439071>",
    "<:hayasaka:771608335770189825>",
    "<:chikamelt:771608882917015604>",
    "<:kaguyalaugh:771877274458914836>",
    "<:chikacaught:773608810068705282>",
    "<:kaguyacry:773646963157237801>"
];

module.exports = {
    name: 'emote',
    description: 'Random Emote',
    execute(client, msg, args) {
        msg.channel.send(emotes[util.get_rand(emotes.length)]);
    },
};
