const { ActivityType } = require('discord.js');
module.exports = {
    // Radio - Music
    RadioConfig: {
        name: "Radio",
        console: "\x1b[31mRadio\x1b[0m",
        id: "radio",
        version: "Alpha 0.0.1 (dev-build)",
        lastUpdated: "N/A",
        clientID: '982717504482869301',
        activity: {
            status: 'dnd',
            afk: false,
            activities: [{
                name: 'your sick tunes!',
                type: ActivityType.Listening
            }]
        },
        // !!! IMPORTANT !!!
        token: "0d9e0d9e0d9e0d9e0d9e",
        publicRelease: false,
    },
    // Joystick - Games
    JoystickConfig: {
        name: "Joystick",
        console: "\x1b[32mJoystick\x1b[0m",
        id: "joystick",
        version: "Alpha 0.0.1 (dev-build)",
        lastUpdated: "N/A",
        clientID: '1005594917277548704',
        activity: {
            status: 'dnd',
            afk: false,
            activities: [{
                name: 'games with you!',
                type: ActivityType.Playing
            }]
        },
        // !!! IMPORTANT !!!
        token: "0d9e0d9e0d9e0d9e0d9e",
        publicRelease: false,
    },
    // Toolbox - Utility
    ToolboxConfig: {
        name: "Toolbox",
        console: "\x1b[33mToolbox\x1b[0m",
        id: "toolbox",
        version: "Alpha 0.0.1 (dev-build)",
        lastUpdated: "N/A",
        clientID: '1005648216366260354',
        activity: {
            status: 'dnd',
            afk: false,
            activities: [{
                name: 'for people to help!',
                type: ActivityType.Watching
            }]
        },
        // !!! IMPORTANT !!!
        token: "0d9e0d9e0d9e0d9e0d9e",
        publicRelease: false,
    },
    // Hammer - Moderation
    HammerConfig: {
        name: "Hammer",
        console: "\x1b[35mHammer\x1b[0m",
        id: "hammer",
        version: "Alpha 0.0.1 (dev-build)",
        lastUpdated: "N/A",
        clientID: '1005683122744074271',
        activity: {
            status: 'dnd',
            afk: false,
            activities: [{
                name: 'for troublemakers!',
                type: ActivityType.Watching
            }]
        },
        // !!! IMPORTANT !!!
        token: "0d9e0d9e0d9e0d9e0d9e",
        publicRelease: false,
    },
    // Cog - Custom Commands
    CogConfig: {
        name: "Cog",
        console: "\x1b[36mCog\x1b[0m",
        id: "cog",
        version: "Alpha 0.0.1 (dev-build)",
        lastUpdated: "N/A",
        clientID: '1005684531040366703',
        activity: {
            status: 'dnd',
            afk: false,
            activities: [{
                name: 'for new commands!',
                type: ActivityType.Watching
            }]
        },
        // !!! IMPORTANT !!!
        token: "0d9e0d9e0d9e0d9e0d9e",
        publicRelease: false,
    },
    // Box - Fun
    BoxConfig: {
        name: "Box",
        console: "\x1b[34mBox\x1b[0m",
        id: "box",
        version: "Alpha 0.0.1 (dev-build)",
        lastUpdated: "N/A",
        clientID: '1005891351499526186',
        activity: {
            status: 'dnd',
            afk: false,
            activities: [{
                name: 'around with you!',
                type: ActivityType.Playing
            }]
        },
        // !!! IMPORTANT !!!
        token: "0d9e0d9e0d9e0d9e0d9e",
        publicRelease: false,
    }
};
