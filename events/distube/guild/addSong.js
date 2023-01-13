const embedConfig = require('../../../config/embeds.js');
const ut = require('../../../functions/utilitrigam.js');
const componentBuilder = require('../../../functions/componentBuilder.js');
module.exports = (Discord, bot, queue, song) => {
    queue.textChannel.send({
        embeds: [
            componentBuilder.basicEmbed(
                'Song Added',
                `Added \`${song.name}\` - \`(${song.formattedDuration})\` to the queue!`,
                embedConfig.colors.default,
                song.thumbnail,
                null
            )
        ]
    });
};