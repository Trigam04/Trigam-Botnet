const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const componentBuilder = require('../../functions/componentBuilder.js');
const ut = require('../../functions/utilitrigam.js');
const bots = require('../../config/bots.js');
module.exports = {
    name: "info",
    description: "Gives information about a variety of things!",
    enabled: true,
    options: [{
            type: ApplicationCommandOptionType.Subcommand,
            name: 'user',
            description: "Gives info about a user!",
            required: false,
            options: [{
                type: ApplicationCommandOptionType.User,
                name: 'user',
                description: "The user to get info about",
                required: true
            }]
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        switch (subcommand) {
            case 'user':
                let member = await interaction.guild.members.fetch(options.user);
                let user = await ut.forceFetchUser(options.user, bot);
                await interaction.reply({ embeds: [componentBuilder.userInfoEmbed(user, member, interaction.guild)] });
        }
        //await interaction.reply({ content: `${JSON.stringify(options)}` });   
    }
};