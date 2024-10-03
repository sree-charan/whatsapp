// commands/ping.js
module.exports = {
    name: '.ping',
    execute: async (message) => {
        await message.reply('Pong!');
    }
};
