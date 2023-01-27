const { ApplicationCommandType } = require("discord.js");
const pooler = require("../../functions/pooler.js");
const bracketeer = require('../../functions/bracketeer.js');
module.exports = {
    name: "ping",
    description: "Responds with the ping of the bot!",
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        let sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
        let latency = sent.createdTimestamp - interaction.createdTimestamp;
        var response = "...";
        let general = Math.floor(Math.random() * 2) == 1;
        switch (!general) {
            case latency < 100: response = pooler.pingVeryLow(); break;
            case latency < 200: response = pooler.pingLow(); break;
            case latency < 500: response = pooler.pingMedium(); break;
            case latency < 1500: response = pooler.pingHigh(); break;
            case latency > 1500: response = pooler.pingVeryHigh(); break;
        };
        response = pooler.pingGeneral();
        response = await bracketeer(response, null, {loopLimit: 500}, bot, Discord, interaction);
        await interaction.editReply({ content: `**${response[0]}**\nLatency: \`${latency} ms\`\nWebsocket Latency: \`${bot.ws.ping} ms\`` });
    }
};