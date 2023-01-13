const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, Embed } = require('discord.js');
const embedConfig = require('../config/embeds.js');
const presences = require('../types/presence.js');
const ut = require('./utilitrigam.js');
const components = {
    basicEmbed: (title, description, color, thumbnail, footer) => {
        let emb = new EmbedBuilder();
        if (color) emb.setColor(color); else emb.setColor(embedConfig.colors.default);
        if (title) emb.setTitle(title);
        if (description) emb.setDescription(description);
        if (thumbnail) emb.setThumbnail(thumbnail);
        if (footer) emb.setFooter({ text: footer });
        return emb;
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
    songInfoEmbed: (title, color, video) => {
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
                .setLabel(ut.ellipsify(video.name, 80))
                .setStyle(ButtonStyle.Link)
        )
    },
    songConfirmRecieveEmbed: (desc, color, video) => {
        if (video && video.name && video.formattedDuration) replacedDesc = desc.replace('{song}', `\`${video.name}\` - \`(${video.formattedDuration})\``);
        else if (video && video.name) replacedDesc = desc.replace('{song}', `\`${video.name}\``);
        else replacedDesc = desc.replace('{song}', 'your song');
        return components.basicEmbed(embedConfig.titles.requestRecieved, replacedDesc, color, video ? video.thumbnail : null);
    },
    songSelectMenu: (Discord, bot, list) => {
        var i = 0;
        return new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId('music_play_song_select')
                .setPlaceholder('Select a song')
                .addOptions(list.map(item => {
                    i++;
                    return {
                        label: `${i}. ${item.name}`,
                        value: item.url,
                        description: item.formattedDuration
                    }
                }))
        )
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
};
module.exports = components;