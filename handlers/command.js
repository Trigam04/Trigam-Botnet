var config = require('../config/config.js')
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

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
        const rest = new REST({ version: '10' }).setToken(bot.token);
        for (const server of config.whitelistedServers) {
            if (bot.guilds.cache.has(server)) {
                await bot.guilds.cache.get(server).commands.set(commands);
            }
        }
    });
}