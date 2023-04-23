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
    name: 'flip',
    description: 'Ideas are sometimes retarded, sometimes not',
    execute(client, msg, args) {
        if (args.length == 1 && args[0] == "meaning") {
            msg.reply("Ideas are sometimes retarded, sometimes not");
            return;
        }

        // Random react on westerner's messages
        let member = msg.guild.members.cache.get(msg.author.id).displayName;

        if (util.get_rand(2) == 0) // || member == "ServerProfile")
            msg.reply("You're retarded, congrats!");
        else
            msg.reply("You're not retarded, congrats!");
    },
};
