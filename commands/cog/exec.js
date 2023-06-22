const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const bracketeer = require('../../functions/bracketeer.js');
module.exports = {
    name: "exec",
    description: "Execute custom command code!",
    enabled: true,
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
        let coded = await bracketeer(options.code, options.args ? options.args.split(',') : null, {loopLimit: 500, devMode: options.debug}, bot, Discord, interaction);
        let fixed = coded[0].toString().substring(0, 2000);
        if (fixed.length <= 0) fixed = "Cannot send empty message!";
        try { await interaction.reply({ content: fixed, ephemeral: coded[1].ephemeral }); }
        catch (e) { /* fuck you i'm not logging this */ }
    }
};