const fs = require('fs');
module.exports = (bot, Discord) => {
    
    // Load each event type directory
    for (const eventType of fs.readdirSync('./events')) {
        for (const event of fs.readdirSync(`./events/${eventType}`)) loadDir(event, eventType);
    };

    // Load all events in the events folder
    function loadDir (dirs, type = 'discord') {
        const eventFiles = fs.readdirSync(`./events/${type}/${dirs}`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${type}/${dirs}/${file}`);
            const eventName = file.split('.')[0];
            if (type !== 'discord') {
                if (bot[type]) {
                    if (event.once) bot[type].once(eventName, event.bind(null, Discord, bot));
                    else bot[type].on(eventName, event.bind(null, Discord, bot));
                }
            } else {
                if (event.once) bot.once(eventName, event.bind(null, Discord, bot));
                else bot.on(eventName, event.bind(null, Discord, bot));
            };
        };
    };
};