// joke.js - Fetches a random joke from the JokeAPI and sends it to the user.
const axios = require('axios');

module.exports = {
  name: '.joke',
  description: 'Fetches a random joke from the JokeAPI and sends it to the chat.',
  execute: async (message, args, client) => {
    const jokeUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    
    try {
      // Make a request to the JokeAPI
      const response = await axios.get(jokeUrl);
      const joke = response.data;

      // Construct the joke message based on its type
      let jokeMessage;
      if (joke.type === 'single') {
        // Single-line joke
        jokeMessage = `${joke.joke}`;
      } else if (joke.type === 'twopart') {
        // Two-part joke (setup + delivery)
        jokeMessage = `${joke.setup}\n\n*${joke.delivery}*`;
      } else {
        // If the response type is unexpected
        jokeMessage = 'Sorry, No Jokes today. 😅';
      }

      // Send the joke as a reply to the user
      await message.reply(jokeMessage);

    } catch (error) {
      console.error('Error fetching joke:', error);
      // Log the error, but do not send an error message to the user.
    }
  },
};
