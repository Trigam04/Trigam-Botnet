const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, Embed } = require('discord.js');
const embedConfig = require('../config/embeds.js');
const presences = require('../types/presence.js');
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
    userInfoEmbed: (user, guild) => {
        let activity = user.presence.activities[0];
        if (activity.state) activityString = activity.state;
        else if (activity.name) activityString = activity.name;
        else activityString = "No activity";
        if (activity.emoji) activityString = `${activity.emoji.name} ${activityString}`;
        console.log(user.presence)
        return new EmbedBuilder()
            .setTitle(`${user.nickname ? user.nickname : user.user.username}'s info`)
            .setColor(user.displayColor ? user.displayColor : embedConfig.colors.default)
            .setThumbnail(user.user.avatarURL())
            .addFields({
                name: "User ID",
                value: user.id,
                inline: false
            }, {
                name: "Tag",
                value: user.user.tag,
                inline: true
            }, {
                name: "Nickname",
                value: user.nickname ? user.nickname : user.user.username,
                inline: true
            }, {
                name: "Bot?",
                value: user.user.bot ? "Yes" : "No",
                inline: true
            }, {
                name: "Presence",
                value: presences[user.presence.status],
                inline: true
            }, {
                name: "Status",
                value: activityString ? activityString : "None",
            }, {
                name: "Permissions",
                value: `[${user.permissions.bitfield}](https://discordapi.com/permissions.html#${user.permissions.bitfield})`,
                inline: true
            }, {
                name: "Joined",
                value: user.joinedAt.toLocaleString(),
                inline: true
            }, {
                name: "Roles",
                value: user.roles.cache.map(r => r.name).join(', '),
                inline: true
            })
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
            .setDescription(`${ut.unurban(search.definition)}\n\n*${ut.unurban(search.example)}*\n\n👍 ${search.thumbs_up}ㅤ•ㅤ👎 ${search.thumbs_down}`)
            .setFooter({ text: `${search.author}  •  ${new Date(search.written_on).toLocaleDateString()}` })
    },
    definitionButtons: (Discord, bot, search) => {
        return new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setURL(search.permalink)
                .setLabel('View definition')
                .setStyle(ButtonStyle.Link),
        )
    },
    definitionDropdown: (Discord, bot, list) => {
        var i = 0;
        return new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId('urban_select_definition')
                .setPlaceholder('Select a definition')
                .addOptions(list.map(item => {
                    i++;
                    let long = item.definition.length > 50;
                    return {
                        label: item.word.substring(0, 99),
                        description: `${ut.unurban(item.definition.substring(0, 50), true)}${long ? '...' : ''}`,
                        value: `def_${i}`
                    }})
                )
        )
    }
}