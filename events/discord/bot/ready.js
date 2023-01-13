const logins = require('../../../pools/start.json');
module.exports = (Discord, bot) => {
    console.log(`${bot.config.console} ${logins[Math.floor(Math.random() * logins.length)]}`);
};