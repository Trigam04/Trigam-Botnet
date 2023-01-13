const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ut = require('../../functions/utilitrigam.js');
const jimp = require('jimp');
const fs = require('fs');
module.exports = {
    name: "gd",
    description: "Get Geometry Dash data straight from the servers!",
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
        interaction.deferReply();
        switch (subcommand) {
            case "profile": {
                // Setup
                let user = options.user;
                let data = await ut.fetchURL(`https://gdbrowser.com/api/profile/${user}`);
                // Fonts
                const fonts = await ut.registerJimpFonts(jimp);
                // Images
                let profileBackground = await jimp.read(`assets/gd/profile.png`);
                // Create Image 
                fillText(profileBackground, data.username, fonts.pusab_180, '#FFFFFF', 0, 140, 1920, 1296, jimp.HORIZONTAL_ALIGN_CENTER, jimp.VERTICAL_ALIGN_CENTER);
                // Send Image
                profileBackground.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
                    await interaction.editReply({ files: [ buffer ] });
                });
                break;
            };
        };
        //await interaction.reply({ content: `${JSON.stringify(options)}` });   
    }
};

fillText = (img, str, font, color, x, y, xMax, yMax, alignX, alignY) => {
    let textImage = new jimp(xMax, yMax, 0x0);
    textImage.print(font, x, y, {
        text: str,
        alignmentX: alignX,
        alignmentY: alignY
    }, xMax, yMax);
    textImage.color([{ apply: 'xor', params: [color] }]);
    img.blit(textImage, 0, 0);
}