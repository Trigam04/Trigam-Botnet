const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const embedConfig = require('../../config/embeds.js');
const errors = require('../../config/errors.js');
const errorBuilder = require('../../functions/errorBuilder.js');
const componentBuilder = require('../../functions/componentBuilder.js');
const ut = require('../../functions/utilitrigam.js');
const { SoundCloudPlugin } = require('@distube/soundcloud');
module.exports = {
    name: "play",
    description: "Plays a song",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'query',
            description: 'The name or a URL of a song',
            required: true
        }, {
            type: ApplicationCommandOptionType.Boolean,
            name: 'force',
            description: 'Force the song to play without a confirmation',
            required: false
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        const voiceChannel = interaction.member.voice.channel;
        // If user is not in a voice channel
        if (!voiceChannel) return interaction.reply(errorBuilder(Discord, bot, errors.notInVc));
        try {
            var search = options.query;
            // If using a URL
            if (ut.validURL(search)) {
                await interaction.deferReply();
                var video = null;
                //try { var video = await bot.distube.search(search) } catch (e) { };
                // If bypassing confirmation
                if (options.force) {
                    interaction.editReply({
                        embeds: [
                            componentBuilder.songConfirmRecieveEmbed(Discord, bot, video ? video[0] : null)
                        ], ephemeral: true
                    });
                    return await bot.distube.play(voiceChannel, search, { textChannel: interaction.channel, member: interaction.member });
                }
                // Confirm playing the song
                await interaction.editReply({ ephemeral: true, embeds: [
                    componentBuilder.songInfoEmbed(Discord, bot,
                        "Are you sure you want to play this song?",
                        embedConfig.colors.prompt,
                    video[0])
                ], components: [ componentBuilder.songConfirmButtons(Discord, bot, video[0], false) ] });
                // Listen for button presses
                const collector = interaction.channel.createMessageComponentCollector(ut.collectFilter, { time: 60000 });
                collector.on('collect', async (i) => {
                    if (i.customId === 'music_play_song_comfirm') {
                        // Confirm song
                        i.deferUpdate();
                        bot.distube.play(voiceChannel, search, { textChannel: interaction.channel, member: interaction.member });
                        interaction.editReply({
                            embeds: [
                                componentBuilder.songConfirmRecieveEmbed(Discord, bot,
                                    `Added \`${video[0].name}\` - \`(${video[0].formattedDuration})\` to the queue!`,
                                    embedConfig.colors.accept,
                                video[0])
                            ]
                        });
                        collector.stop();
                    } else if (i.customId === 'music_play_song_cancel') {
                        // Cancel song
                        i.deferUpdate();
                        interaction.editReply({
                            embeds: [
                                componentBuilder.songConfirmRecieveEmbed(Discord, bot,
                                    `No longer playing \`${video[0].name}\` - \`(${video[0].formattedDuration})\`!`,
                                    embedConfig.colors.deny,
                                video[0])
                            ]
                        });
                        collector.stop();
                    }
                });
                collector.on('end', collected => {
                    interaction.editReply({
                        components: [ componentBuilder.songConfirmButtons(Discord, bot, video[0], true) ]
                    });
                })
            } else {
                // If using search term
            }
            
        } catch (e) { console.log(e) }
    }
};