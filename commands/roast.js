const axios = require('axios');

module.exports = {
  name: '.roast',
  description: 'Generates a playful roast for the specified name using the Evil Insult API.',
  execute: async (message, args, client) => {
    const name = args.trim();

    // Validate the input
    if (!name) {
      await message.reply("⚠️ Please provide a name to roast.\nExample: .roast John");
      return;
    }

    try {
      // Call the Evil Insult API to get a random roast
      const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
      const roast = response.data.insult;

      // Send the roast with the specified name
      await message.reply(`🔥 ${name}, ${roast}`);
    } catch (error) {
      console.error('Error generating roast:', error);
      await message.reply("⚠️ Sorry, I couldn't come up with a roast. Try again later.");
    }
  },
};
