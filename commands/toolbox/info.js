const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const componentBuilder = require('../../functions/componentBuilder.js');
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
                let user = await interaction.guild.members.cache.get(options.user);
                console.log(user.presence.status)
                console.log(user.presence.activities[0])
                // create an embed with info on the user
                await interaction.reply({ embeds: [componentBuilder.userInfoEmbed(user, interaction.guild)] });
        }
        //await interaction.reply({ content: `${JSON.stringify(options)}` });   
    }
};