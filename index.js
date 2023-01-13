console.clear();
console.log('Starting botnet...');
// Setup
const Discord = require('discord.js');
const botClients = require('./config/botClients.js');
const botConfigs = require('./config/bots.js');
const fs = require('fs');
// Distube
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SoundCloudPlugin } = require('@distube/soundcloud');

botClients.Radio.distube = new DisTube(botClients.Radio, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: true,
    plugins: [ new SpotifyPlugin(), new YtDlpPlugin(), new SoundCloudPlugin() ]
});

// Setup each bot
for (i = 0; i < Object.keys(botClients).length; i++) {
    var bot = Object.values(botClients)[i];
    var botConfig = Object.values(botConfigs)[i];
    bot.discord = Discord;
    bot.commands = new Discord.Collection();
    bot.config = botConfig;
    bot.cwd = require('process').cwd();
    bot.token = botConfig.token;
    // Handling
    for (const handler of fs.readdirSync('./handlers')) {
        require(`./handlers/${handler}`)(bot, Discord);
    }
    // Log in
    bot.login(bot.config.token);
};