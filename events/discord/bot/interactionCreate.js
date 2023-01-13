const config = require('../../../config/config.js');
const errors = require('../../../config/errors.js');
const errorBuilder = require('../../../functions/errorBuilder.js');
const optionsParser = require('../../../functions/optionsParser.js');
module.exports = (Discord, bot, interaction) => {
    if (bot.config.publicRelease || (!bot.config.publicRelease && config.whitelistedUsers.includes(interaction.member.id))) {
        if (interaction.isCommand()) {
            const command = bot.commands.get(interaction.commandName);
            if (command) return command.execute(Discord, bot, interaction, optionsParser(interaction.options._hoistedOptions), interaction.options._subcommand);
            else return interaction.reply(errorBuilder(Discord, bot, errors.errorRunningCommand)) && bot.commands.delete(interaction.commandName);
        }
    } else interaction.reply(errorBuilder(Discord, bot, errors.noBotAccess));
}