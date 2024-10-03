// commands/meme.js
const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');
const { MEME_API_URL } = require('../config');

module.exports = {
    name: '.meme',
    execute: async (message) => {
        try {
            // Fetch a random meme from the API
            const response = await axios.get(MEME_API_URL);
            const memeUrl = response.data.url;

            // Fetch the meme image
            const memeImage = await axios.get(memeUrl, { responseType: 'arraybuffer' });
            const imageBase64 = Buffer.from(memeImage.data, 'binary').toString('base64');

            // Create a MessageMedia object from the meme
            const media = new MessageMedia('image/jpeg', imageBase64, 'meme.jpg');
            await message.reply(media);
        } catch (error) {
            console.error("Error fetching meme:", error);
            // No reply to the user, only logging the error
        }
    }
};
