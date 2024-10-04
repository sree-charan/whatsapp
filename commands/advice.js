const axios = require('axios');

module.exports = {
  name: '.advice',
  description: 'Fetches a random piece of advice and sends it to the user.',
  execute: async (message, args, client) => {
    try {
      // Call the Advice Slip API to get random advice
      const response = await axios.get('https://api.adviceslip.com/advice');
      const advice = response.data.slip.advice;

      // Reply with the advice
      await message.reply(`💡 *Here's a piece of advice for you:*\n\n"${advice}"`);
    } catch (error) {
      console.error('Error fetching advice:', error);
      await message.reply("⚠️ Sorry, I couldn't fetch a piece of advice at the moment. Please try again later.");
    }
  },
};
