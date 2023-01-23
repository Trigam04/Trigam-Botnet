const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const pooler = require('../../functions/pooler.js');
module.exports = {
    name: "quote",
    description: "Get quotes from your favorite characters!",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'character',
            description: "The character you want a quote from.",
            required: true,
            choices: [
                { name: "Barry B. Benson", value: "quote_barry" },
                { name: "Gex", value: "quote_gex" },
                { name: "Eugene Harold Krabs", value: "quote_krabs" },
                { name: "Maui", value: "quote_maui" },
                { name: "Sans the Skeleton", value: "quote_sans" },
                { name: "Papyrus the Skeleton", value: "quote_papyrus" },
                { name: "Shrek", value: "quote_shrek" },
                { name: "Vector", value: "quote_vector" },
            ]
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        let quote = pooler[options.character.split('_')[1]](interaction.id);
        await interaction.reply({ content: `> "${quote}"` });   
    }
};