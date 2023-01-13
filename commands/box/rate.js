const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ut = require('../../functions/utilitrigam.js');
const seedrandom = require('seedrandom');
module.exports = {
    name: "rate",
    description: "Give a rating on anything",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'something',
            description: "The thing to rate",
            required: true
        }, {
            type: ApplicationCommandOptionType.Integer,
            name: 'max',
            description: "The max number of stars to rate",
            required: false
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        // Emojis
        let star = '⭐';
        let halfStar = '<:half_star:1006652378369499166>';
        let darkStar = '<:dark_star:1006652399626244226>';
        // Stuff
        var max = ut.limit(options.max || 5, 0, 50);
        var rate = Math.floor(new seedrandom(options.something)() * ((max * 2) + 1));
        var bar = ut.progress(rate, max * 2, max * 2, '-', '=', '=');
        var split = bar.match(/.{1,2}/g);
        var str = '';
        for (var st of split)  str += st.replace('==', star).replace('=-', halfStar).replace('--', darkStar);
        var numStr = (rate / 2).toString().replace('.5', ' 1/2').replace('0 1/2', '1/2');
        var fullStr = `I rate **${options.something}** ${numStr} ${['1/2', '1'].includes(numStr) ? 'star' : 'stars'} out of ${max}!\n${str}`;
        await interaction.reply({ content: fullStr });   
    }
};