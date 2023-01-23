const pooler = require('../../../functions/pooler.js');
module.exports = (Discord, bot) => {
    console.log(`${bot.config.console} ${pooler.login()}`);
};