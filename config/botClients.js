const { Client, GatewayIntentBits } = require('discord.js');
const { RadioConfig, JoystickConfig, ToolboxConfig, HammerConfig, CogConfig, BoxConfig } = require('./bots.js');

module.exports = {
    Radio: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers
        ],
        presence: RadioConfig.activity
    }),
    Joystick: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers
        ],
        presence: JoystickConfig.activity
    }),
    Toolbox: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers
        ],
        presence: ToolboxConfig.activity
    }),
    Hammer: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers
        ],
        presence: HammerConfig.activity
    }),
    Cog: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers
        ],
        presence: CogConfig.activity
    }),
    Box: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers
        ],
        presence: BoxConfig.activity
    })
};