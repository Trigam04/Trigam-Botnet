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
        if (!voiceChannel) return interaction.reply(errorBuilder(Discord, bot, errors.notInVc)); // Not in VC
        try {
            var search = options.query;
            await interaction.deferReply();
            if (ut.validURL(search)) {
                return playSongURL(search, interaction, voiceChannel);
            } else {
                let video = await searchVideo(search);
                if (options.force) return playSongURL(video[0], interaction, voiceChannel);
                // Select menu
                var selectMenu = componentBuilder.songSelectMenu(Discord, bot, video);
                await interaction.editReply({ embeds: [
                    componentBuilder.songInfoEmbed("Select a song to play", embedConfig.colors.prompt, video[0])
                ], components: [ selectMenu ] });
                // Listen for select menu presses
                const collector = interaction.channel.createMessageComponentCollector(ut.collectFilter, { time: 60000 });
                collector.on('collect', async (i) => {
                    if (i.customId === 'music_play_song_select') {
                        i.deferUpdate();
                        let selectedURL = i.values[0];
                        let selected = await searchVideo(selectedURL); selected = selected[0];
                        await playSongURL(selected, interaction, voiceChannel);
                        collector.stop();
                    }
                });
                collector.on('end', collected => {
                    interaction.editReply({
                        components: [ ]
                    });
                })
            }
            
        } catch (e) { return interaction.reply(errorBuilder(Discord, bot, errors.errorRunningCommand)); }

        async function playSongURL(video, interaction, vc) {
            if (!video) return interaction.editReply(errorBuilder(Discord, bot, errors.noSongResults)); // No results
            // Embed
            await interaction.editReply({
                embeds: [
                    componentBuilder.songConfirmRecieveEmbed("Adding {song} to the queue...", embedConfig.colors.accept, video)
                ], components: [], ephemeral: true
            });
            // Play song
            try { bot.distube.play(vc, video.url ? video.url : video, { textChannel: interaction.channel, member: interaction.member }); }
            catch (e) { return interaction.channel.send({
                embeds: [ errorBuilder(Discord, bot, errors.couldntPlaySong) ]
            }) }
        }

        async function searchVideo(search) {
            var video = null;
            try { video = await bot.distube.search(search); } catch (e) { return interaction.reply(errorBuilder(Discord, bot, errors.errorRunningCommand)); };
            if (!video) try { video = await SoundCloudPlugin.search(search); } catch (e) { return interaction.reply(errorBuilder(Discord, bot, errors.errorRunningCommand)); };
            return video;
        };
    }
};