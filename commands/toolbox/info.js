const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const componentBuilder = require('../../functions/componentBuilder.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bots = require('../../config/bots.js');
module.exports = {
    name: "info",
    description: "Gives information about a variety of things!",
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
                console.log(options.user)
                let user = await fetch(`https://discord.com/api/v8/users/${options.user}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bot ${bots.ToolboxConfig.token}`
                    }
                }).then(res => res.json());
                console.log(user);
                await interaction.reply({ embeds: [componentBuilder.userInfoEmbed(user, member, interaction.guild)] });
        }
        //await interaction.reply({ content: `${JSON.stringify(options)}` });   
    }
};