const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const bracketeer = require('../../functions/bracketeer.js');
module.exports = {
    name: "exec",
    description: "Execute custom command code!",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'code',
            description: 'The code to run',
            required: true,
        }, {
            type: ApplicationCommandOptionType.String,
            name: 'args',
            description: "Give the command some arguments (seperated by commas)",
            required: false,
        }, {
            type: ApplicationCommandOptionType.Boolean,
            name: 'debug',
            description: "Show the steps as the command is executed",
            required: false,
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        let coded = await bracketeer(options.code, options.args, {loopLimit: 500, devMode: options.debug}, bot, Discord, interaction);
        try { await interaction.reply({ content: coded.toString() }); }
        catch (e) { console.error(e); }
    }
};