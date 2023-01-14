const { EmbedBuilder } = require('discord.js');
const embedConfig = require('../config/embeds.js');
module.exports = (error) => {
    return {
        embeds: [
            new EmbedBuilder()
            .setColor(embedConfig.colors.error)
            .setTitle(embedConfig.titles.error)
            .setDescription(`${error.description}\n\`${error.value}\``)
            .setFooter({ text: embedConfig.footers.error })
        ],
        ephemeral: true
    };
}