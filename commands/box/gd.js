const { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const ut = require('../../functions/utilitrigam.js');
const errors = require('../../config/errors.js');
const errorBuilder = require('../../functions/errorBuilder.js');
const iconGenerator = require('../../functions/iconGenerator.js');
const Canvas = require('canvas');
const fs = require('fs');
module.exports = {
    name: "gd",
    description: "Get Geometry Dash data straight from the servers!",
    enabled: false,
    options: [
        {
            name: "profile",
            description: "Get the data of a user!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: 'user',
                    description: "The username/ID to get the profile of",
                    required: true
                }
            ]
        }, {
            name: "level",
            description: "Get the data of a level!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: 'level',
                    description: "The ID of the level to get the data of",
                    required: true
                }
            ]
        }, {
            name: "search",
            description: "Search for a level!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: 'query',
                    description: "The name of the level",
                    required: true
                }
            ]
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.deferReply();
        switch (subcommand) {
            case "profile": {
                // Setup
                interaction.editReply({ content: 'Setting up...' });
                let user = options.user;
                let data = await ut.fetchURL(`https://gdbrowser.com/api/profile/${user}`);
                if (data == -1) await interaction.editReply({ embeds: [errorBuilder(errors.gdUserNotFound)] });
                // Fonts
                Canvas.registerFont('././assets/fonts/Pusab.ttf', { family: 'Pusab' })
                // Images
                interaction.editReply({ content: 'Loading images...' });
                let profileImage = await Canvas.loadImage('././assets/gd/profile.png');
                // Create canvas
                let canvas = Canvas.createCanvas(profileImage.width, profileImage.height);
                let ctx = canvas.getContext('2d');
                
                ctx.drawImage(profileImage, 0, 0, canvas.width, canvas.height);
                // Username
                interaction.editReply({ content: 'Writing text...' });
                ut.canvasSetFont(ctx, "Pusab", 100, "#ffffff", "#000000", 3, "center");
                ut.canvasSetShadow(ctx, 'rgba(0, 0, 0, 0.45)', 3, 8, 8);
                ut.canvasWriteText(ctx, data.username, canvas.width / 2, 145, true);

                ut.canvasSetShadow(ctx, 'rgba(0, 0, 0, 0)', 0, 0, 0);
                // Draw player icon
                interaction.editReply({ content: 'Drawing icons...' });
                let cube = await iconGenerator(2, "cube", data.col1, data.col2, data.col2);
                ctx.drawImage(cube, 50, 50);
                
                interaction.editReply({ content: 'Buffering image...' });
                let profileAttachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'profile.png' });
                await interaction.editReply({ content: `\`\`\`json\n${JSON.stringify(data)}\`\`\``, files: [profileAttachment] });   
                console.log('Finished! somehow.....');
                break;
            };
        };
    }
};