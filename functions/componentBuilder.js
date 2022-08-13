const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const embedConfig = require('../config/embeds.js');
const ut = require('./utilitrigam.js');
module.exports = {
    basicEmbed: (title, description, color, thumbnail, footer) => {
        return new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setThumbnail(thumbnail)
            .setFooter({ text: footer })
    },
    songInfoEmbed: (Discord, bot, title, color, video) => {
        return new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .addFields({
                name: "Title",
                value: video.name,
                inline: false
            }, {
                name: "Length",
                value: video.formattedDuration,
                inline: true
            }, {
                name: "Uploader",
                value: `[${video.uploader.name}](${video.uploader.url})`,
                inline: true
            })
            .setImage(video.thumbnail)
    },
    songConfirmButtons: (Discord, bot, video, disabled) => {
        return new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('music_play_song_comfirm')
                .setLabel('Comfirm')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(disabled),
            new ButtonBuilder()
                .setCustomId('music_play_song_cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(disabled),
            new ButtonBuilder()
                .setURL(video.url)
                .setLabel(video.name)
                .setStyle(ButtonStyle.Link)
        )
    },
    songConfirmRecieveEmbed: (Discord, bot, video) => {
        if (video) var desc = `Added \`${video.name}\` - \`(${video.formattedDuration})\` to the queue!`;
        if (!video) var desc = 'Added your song to the queue!';
        return new EmbedBuilder()
            .setColor(embedConfig.colors.accept)
            .setTitle(`Request received!`)
            .setDescription(desc)
            .setImage(video ? video.thumbnail : null)
    },
    definitionEmbed: (Discord, bot, search) => {
        return new EmbedBuilder()
            .setColor(embedConfig.colors.default)
            .setTitle(`${search.word}`)
            .setDescription(`${ut.unurban(search.definition)}\n\n*${ut.unurban(search.example)}*`)
            .setFooter({ text: `👍 ${search.thumbs_up}   •   👎 ${search.thumbs_down}` })
    }
}