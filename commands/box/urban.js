const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ut = require('../../functions/utilitrigam.js');
const componentBuilder = require('../../functions/componentBuilder');
const errorBuilder = require('../../functions/errorBuilder');
const errors = require('../../config/errors.js');
module.exports = {
    name: "urban",
    description: "Search a term straight from Urban Dictionary!",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'term',
            description: "The term you wish to search for.",
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        let search = await fetch(`https://api.urbandictionary.com/v0/define?term=${options.term}`).then(res => res.json());
        if (!search.list[0]) return interaction.reply({ embeds: [ errorBuilder('Discord', bot, errors.noUrbanResults ) ] });
        if (!search.list[1]) {
            return await interaction.reply({
                embeds: [ componentBuilder.definitionEmbed(Discord, bot, search.list[0]) ],
                components: [ componentBuilder.definitionButtons(Discord, bot, search.list[0]) ]
            }); 
        } else {
            await interaction.reply({
                components: [ componentBuilder.definitionDropdown(Discord, bot, search.list) ]
            });
            const collector = interaction.channel.createMessageComponentCollector(ut.collectFilter, { time: 60000 });
            collector.on('collect', async (i) => {
                if (i.customId === 'urban_select_definition') {
                    i.deferUpdate();
                    let index = Number(i.values[0].replace('def_', '')) - 1
                    await interaction.editReply({
                        embeds: [ componentBuilder.definitionEmbed(Discord, bot, search.list[index]) ],
                        components: [ componentBuilder.definitionButtons(Discord, bot, search.list[index]) ]
                    });
                };
                collector.stop();
            });
        };
    }
};