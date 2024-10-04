const axios = require('axios');

module.exports = {
  name: '.time',
  description: 'Fetches the current time for a specified city using the World Time API.',
  execute: async (message, args, client) => {
    const location = args.trim();

    // Validate the location input
    if (!location) {
      await message.reply("⚠️ Please specify a city to get the current time.\nExample: .time Tokyo");
      return;
    }

    try {
      // Call the World Time API
      const response = await axios.get(`http://worldtimeapi.org/api/timezone/${location}`);
      const timeData = response.data;

      // Extract and format the current time
      const currentTime = new Date(timeData.datetime).toLocaleTimeString('en-US', { timeZone: location });
      await message.reply(`🕒 The current time in ${location} is: ${currentTime}`);
    } catch (error) {
      console.error('Error fetching time:', error);
      await message.reply("⚠️ Sorry, I couldn't find the time for that location. Please try again with a valid city name.");
    }
  },
};
