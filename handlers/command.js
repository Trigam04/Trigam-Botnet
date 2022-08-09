var config = require('../config/config.js')
const fs = require('fs');

module.exports = (bot, Discord) => {
    const commands = [];
    const commandFiles = fs.readdirSync(`./commands/${bot.config.id}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${bot.config.id}/${file}`);
        bot.commands.set(command.name, command);
        commands.push(command);
    };

    bot.on("ready", async () => {
        if (bot.config.publicRelease) await bot.applications.commands.set(commands);
        for (const server of config.whitelistedServers) {
            await bot.guilds.cache.get(server).commands.set(commands);
        }
    });
}