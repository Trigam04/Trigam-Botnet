const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const componentBuilder = require('../../functions/componentBuilder');
module.exports = {
    name: "urban",
    description: "Search a term straight from Urban Dictionary!",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'term',
            description: "The term you wish to search for.",
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        let search = await fetch(`https://api.urbandictionary.com/v0/define?term=${options.term}`).then(res => res.json());
        console.log(search.list[0]);
        await interaction.reply({ embeds: [componentBuilder.definitionEmbed(Discord, bot, search.list[0])] });   
    }
};