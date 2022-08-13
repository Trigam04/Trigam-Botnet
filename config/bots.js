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
        token: "OTgyNzE3NTA0NDgyODY5MzAx.Ge86P5.w3tE4CG3y9ufSNh4ntf15JUXC5Yut2mZgyRzlg",
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
        token: "MTAwNTU5NDkxNzI3NzU0ODcwNA.GvqXvT.PF5pATVYgPO7EnMZxpeGKxQhxiDYVgby_1PHag",
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
        token: "MTAwNTY0ODIxNjM2NjI2MDM1NA.GomSLD.a3LgHbcWAhrilgRLcdhKC7EE8ZSsawY1NbhXyA",
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
        token: "MTAwNTY4MzEyMjc0NDA3NDI3MQ.GAu_kr.l1VcnfhaS3foIuASfcS5-QosrrJj0BRDLBWdKA",
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
        token: "MTAwNTY4NDUzMTA0MDM2NjcwMw.GY9bJI.rJaLnNe_SZQKU-eemWMxrxJ430bVN1cmbc1w6o",
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
        token: "MTAwNTg5MTM1MTQ5OTUyNjE4Ng.GiNsap.g_CbytHQuVMt6qDivK_gDcPL4tETrhLg3OMsos",
        publicRelease: false,
    }
};