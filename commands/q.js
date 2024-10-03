// commands/q.js
const axios = require('axios');
const { API_URL } = require('../config');

module.exports = {
    name: '.q',
    execute: async (message, prompt) => {
        try {
            const url = `${API_URL}?q=${encodeURIComponent(prompt)}`;
            const response = await axios.get(url);
            await message.reply(response.data);
        } catch (error) {
            console.error('Error calling API:', error);
            // No reply to the user, only logging the error
        }
    }
};
