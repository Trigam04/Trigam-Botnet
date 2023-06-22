const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, Embed } = require('discord.js');
const embedConfig = require('../config/embeds.js');
const presences = require('../types/presence.js');
const emojis = require('../config/emojis.js');
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
    userInfoEmbed: (user, member, guild) => {
        // Banner
        if (user.banner) banner = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=1024`;
        // Roles
        let roleLimit = 15;
        let roles = [...member.roles.cache.values()].filter(r => r.name != "@everyone").sort((a, b) => b.position - a.position);
        let sliced = roles.length >= roleLimit ? roles.slice(0, roleLimit - 1) : roles.slice(0, roleLimit);
        let roleString = "";
        for (let i = 0; i < sliced.length; i++) {
            if (i == roles.length - 1) roleString += `<@&${roles[i].id}>`;
            else roleString += roles[i].toString() + ", ";
        }
        if (roles.length >= roleLimit) roleString += ` and ${roles.length - roleLimit} more...`;
        infoEmbed = new EmbedBuilder()
            .setTitle(`${user.display_name ? user.display_name : user.username}'s info`)
            .setColor(member.display_color ? member.display_color : embedConfig.colors.default)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`)
            .addFields({
                name: "User ID",
                value: member.id,
                inline: false
            }, {
                name: "Display Name",
                value: `${user.display_name}`,
                inline: true
            }, {
                name: "Username",
                value: `${user.username}`,
                inline: true
            }, {
                name: "Nickname",
                value: member.nickname ? member.nickname : user.username,
                inline: true
            }, {
                name: "Bot?",
                value: user.bot ? "Yes" : "No",
                inline: true
            }, {
                name: "Presence",
                value: member.presence ? presences[member.presence.status] : presences["offline"],
                inline: true
            }, {
                name: "Permissions",
                value: `[${member.permissions.bitfield}](https://discordapi.com/permissions.html#${member.permissions.bitfield})`,
                inline: true
            }, {
                name: "Joined",
                value: `<t:${Math.round(member.joinedAt.getTime() / 1000)}:R>`,
                inline: true
            }, {
                name: "Created",
                value: `<t:${Math.round(member.user.createdAt.getTime() / 1000)}:R>`,
                inline: true
            }, {
                name: "Roles",
                value: roleString,
                inline: false
            });
        if (user.banner) infoEmbed.setImage(banner);
        return infoEmbed;
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
                        description: item.formattedDuration,
                        emoji: emojis[item.source]
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