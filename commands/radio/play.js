const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const embedConfig = require('../../config/embeds.js');
const errors = require('../../config/errors.js');
const errorBuilder = require('../../functions/errorBuilder.js');
const componentBuilder = require('../../functions/componentBuilder.js');
const ut = require('../../functions/utilitrigam.js');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
module.exports = {
    name: "play",
    description: "Plays a song",
    enabled: true,
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
        }, {
            type: ApplicationCommandOptionType.String,
            name: 'source',
            description: 'The source platform of the song',
            required: false,
            choices: [
                { name: 'YouTube', value: 'youtube' },
                { name: 'SoundCloud', value: 'soundcloud' },
                { name: 'Spotify', value: 'spotify' },
            ]
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply(errorBuilder(errors.notInVc)); // Not in VC
        try {
            var search = options.query;
            await interaction.deferReply();
            if (ut.validURL(search)) {
                return playSongURL(search, interaction, voiceChannel);
            } else {
                let videos = await searchVideo(search);
                if (options.force) return playSongURL(videos[0], interaction, voiceChannel);
                // Select menu
                var selectMenu = componentBuilder.songSelectMenu(Discord, bot, videos);
                await interaction.editReply({ embeds: [
                    componentBuilder.songInfoEmbed("Select a song to play", embedConfig.colors.prompt, videos[0])
                ], components: [ selectMenu ] });
                // Listen for select menu presses
                const collector = interaction.channel.createMessageComponentCollector(ut.collectFilter, { time: 60000 });
                collector.on('collect', async (i) => {
                    if (i.customId === 'music_play_song_select') {
                        let selectedURL = i.values[0];
                        let selected = videos.filter(video => video.url == selectedURL)[0];
                        await playSongURL(selected, interaction, voiceChannel);
                        collector.stop();
                    }
                });
                collector.on('end', collected => {
                    interaction.editReply({ components: [ ] });
                });
            }
            
        } catch (e) { return interaction.reply(errorBuilder(errors.errorRunningCommand)); }

        async function playSongURL(video, interaction, vc) {
            if (!video) return interaction.editReply(errorBuilder(errors.noSongResults)); // No results
            // Embed
            await interaction.editReply({
                embeds: [
                    componentBuilder.songConfirmRecieveEmbed("Adding {song} to the queue...", embedConfig.colors.accept, video)
                ], components: [], ephemeral: true
            });
            // Play song
            try { bot.distube.play(vc, video.url ? video.url : video, { textChannel: interaction.channel, member: interaction.member }); }
            catch (e) { return interaction.channel.send({
                embeds: [ errorBuilder(errors.couldntPlaySong) ]
            }) }
        }

        async function searchVideo(search) {
            var video = null;
            if (!options.source || options.source == 'youtube') try { video = await bot.distube.search(search); } catch (e) {};
            if (!video || options.source == 'soundcloud') try { video = await SoundCloudPlugin.search(search); } catch (e) {};
            if (!video || options.source == 'spotify') try { video = await SpotifyPlugin.search } catch (e) {};
            return video;
        };
    }
};