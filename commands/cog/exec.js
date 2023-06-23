const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const bracketeer = require('../../functions/bracketeer.js');
const ut = require('../../functions/utilitrigam.js');

const commandOptions = [{
    type: ApplicationCommandOptionType.String,
    name: 'args',
    description: "Give the command some arguments (seperated by commas)",
    required: false,
}, {
    type: ApplicationCommandOptionType.Boolean,
    name: 'debug',
    description: "Show the steps as the command is executed",
    required: false,
}]

module.exports = {
    name: "exec",
    description: "Execute custom command code!",
    enabled: true,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'text',
            description: 'Run code from text',
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: 'code',
                    description: 'The code to run',
                    required: true,
                }
            ].concat(commandOptions)
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'file',
            description: 'Run code from a text file',
            options: [
                {
                    type: ApplicationCommandOptionType.Attachment,
                    name: 'code',
                    description: 'The text file to run',
                    required: true,
                }
            ].concat(commandOptions)
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        // If submitting a file
        if (subcommand == 'file') {
            var attachment = interaction.options.getAttachment("code");
            if (attachment) var attachedCode = await ut.readTxt(attachment);
            if (attachedCode) options.code = attachedCode;
            else return await interaction.reply({ content: 'That file is invalid!', ephemeral: true });
        };
        // Get bracketeer response
        let coded = await bracketeer(options.code, options.args?.split(','), {loopLimit: 500, devMode: options.debug}, bot, Discord, interaction);
        // Clean up response
        let fixed = coded[0].toString().substring(0, 2000);
        if (options.debug) fixed = ut.stripMarkdown(fixed);
        if (fixed.replace(/ /gm, '').replace(/(\r\n|\n|\r)/gm, "").length <= 0 && !coded[1].embed) { fixed = "Cannot send empty message!"; ephemeral = true };
        // Get extra response data
        let eph = coded[1].ephemeral;
        let embed = coded[1].embed;
        if (embed && !embed.description) {embed.description = fixed; fixed = ""; }
        // Send response
        let response = { content: fixed, ephemeral: eph, embeds: [] };
        if (embed) response.embeds[0] = embed;
        try { await interaction.reply(response); }
        catch (e) { await interaction.reply({ content: `There was an error running the custom command!\n\`${e.toString()}\``, ephemeral: true }); }
    }
};