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
        await interaction.deferReply();
        switch (subcommand) {
            case "profile": {
                // Setup
                let user = options.user;
                let data = await ut.fetchURL(`https://gdbrowser.com/api/profile/${user}`);
                await interaction.editReply({ content: `${JSON.stringify(data)}` });   
                break;
            };
        };
    }
};