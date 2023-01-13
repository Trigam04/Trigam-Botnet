const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const barry = require('../../pools/quotes/barry.json');
const gex = require('../../pools/quotes/gex.json');
const krabs = require('../../pools/quotes/krabs.json');
const maui = require('../../pools/quotes/maui.json');
const sans = require('../../pools/quotes/sans.json');
const papyrus = require('../../pools/quotes/papyrus.json');
const shrek = require('../../pools/quotes/shrek.json');
const vector = require('../../pools/quotes/vector.json');
module.exports = {
    name: "quote",
    description: "Give quotes from your favorite characters!",
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
        var quote = '';
        switch (options.character) {
            case 'quote_barry': quote = barry[Math.floor(Math.random() * barry.length)]; break;
            case 'quote_gex': quote = gex[Math.floor(Math.random() * gex.length)]; break;
            case 'quote_krabs': quote = krabs[Math.floor(Math.random() * krabs.length)]; break;
            case 'quote_maui': quote = maui[Math.floor(Math.random() * maui.length)]; break;
            case 'quote_sans': quote = sans[Math.floor(Math.random() * sans.length)]; break;
            case 'quote_papyrus': quote = papyrus[Math.floor(Math.random() * papyrus.length)]; break;
            case 'quote_shrek': quote = shrek[Math.floor(Math.random() * shrek.length)]; break;
            case 'quote_vector': quote = vector[Math.floor(Math.random() * vector.length)]; break;
        };
        await interaction.reply({ content: `> "${quote}"` });   
    }
};