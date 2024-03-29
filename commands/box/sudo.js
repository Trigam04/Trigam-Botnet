const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: "sudo",
    description: "Speak as another user!",
    enabled: true,
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: 'user',
            description: "The user to speak as",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: 'message',
            description: 'The message to send',
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.reply({ content: `Sending...`, ephemeral: true });
        let user = await interaction.guild.members.cache.get(options.user);
        let webhook = await interaction.channel.createWebhook({
            name: user.nickname ? user.nickname : user.user.username,
            avatar: user.user.avatarURL()
        });
        await webhook.send(options.message);
        await webhook.delete();
    }
};