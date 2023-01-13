const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: "test",
    description: "Used to test stuff lol",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'map',
            description: "Choose a map",
            required: true,
            autocomplete: false,
            choices: [{ name: 'Skeld', value: 'map_skeld' }, { name: 'Mira', value: 'map_mira' }, { name: 'Polus', value: 'map_polus' }, { name: 'Airship', value: 'map_airship' }],
            options: [],
            channel_types: []
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: 'impostors',
            description: 'How many impostors?',
            required: false,
            autocomplete: false,
            choices: [],
            options: [],
            channel_types: []
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.reply({ content: `${JSON.stringify(options)}` });   
    }
};