module.exports = (Discord, bot) => {
    var logins = [
        'is now online!',
        'is now reporting for duty!',
        'is ready to serve!',
        'is ready to kick ass and chew gum!',
        'is now ready to blast!'
    ]
    console.log(`${bot.config.console} ${logins[Math.floor(Math.random() * logins.length)]}`);
};