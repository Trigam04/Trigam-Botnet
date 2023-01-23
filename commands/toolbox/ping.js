const { ApplicationCommandType } = require("discord.js");
const pooler = require("../../functions/pooler.js");
module.exports = {
    name: "ping",
    description: "Responds with the ping of the bot!",
    type: ApplicationCommandType.ChatInput,
	execute: async (Discord, bot, interaction, options, subcommand) => {
        let latency = delay = Math.abs(Date.now() - interaction.createdTimestamp);
        var response = "...";
        let general = Math.floor(Math.random() * 2) == 1;
        switch (!general) {
            case latency < 50: response = pooler.pingVeryLow(interaction.id); break;
            case latency < 100: response = pooler.pingLow(interaction.id); break;
            case latency < 250: response = pooler.pingMedium(interaction.id); break;
            case latency < 1000: response = pooler.pingHigh(interaction.id); break;
            case latency > 1000: response = pooler.pingVeryHigh(interaction.id); break;
        };
        if (general) response = pooler.pingGeneral(interaction.id);
        await interaction.reply({ content: `**${response}**\nLatency: \`${latency} ms\`\nWebsocket Latency: \`${bot.ws.ping} ms\`` });
    }
};