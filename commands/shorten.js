const axios = require('axios');

module.exports = {
  name: '.shorten',
  description: 'Shortens a long URL using the TinyURL API and returns the shortened URL.',
  execute: async (message, args, client) => {
    // Extract the URL from the command arguments
    const longUrl = args.trim();

    // Validate the URL format
    if (!longUrl || !longUrl.startsWith('http')) {
      await message.reply("⚠️ Please provide a valid URL starting with http or https.\nExample: .shorten https://www.example.com");
      return;
    }

    try {
      // Call the TinyURL API to shorten the URL
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${longUrl}`);
      const shortenedUrl = response.data;

      // Reply with the shortened URL
      await message.reply(`🔗 Shortened URL: ${shortenedUrl}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
      await message.reply("⚠️ Sorry, I couldn't shorten the URL. Please try again later.");
    }
  },
};
