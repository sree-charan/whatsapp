const axios = require('axios');
const apiKey = 'ea49da02'; // Your OMDb API key
module.exports = {
  name: '.movie',
  description: 'Fetches information about a specified movie from the OMDb API.',
  execute: async (message, args, client) => {
    const movieTitle = args.trim();
    // Validate user input
    if (!movieTitle) {
      await message.reply("⚠️ Please provide a movie title to search for.\nExample: .movie Inception");
      return;
    }
    try {
      // Call the OMDb API to get movie details
      const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
      const movie = response.data;
      // Check if a movie was found
      if (movie.Response === 'False') {
        await message.reply(`⚠️ Sorry, I couldn't find any information about "${movieTitle}". Please check the title and try again.`);
        return;
      }
      // Format the movie details
      const movieDetails = `
    🎬 *${movie.Title}* (${movie.Year})
    ⭐ *IMDB Rating*: ${movie.imdbRating}
    🎭 *Genre*: ${movie.Genre}
    🕒 *Runtime*: ${movie.Runtime}
    📜 *Plot*: ${movie.Plot}
    🎥 *Director*: ${movie.Director}
    🎬 *Actors*: ${movie.Actors}
      `;
      // Send the movie details to the user
      await message.reply(movieDetails);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      await message.reply("⚠️ Sorry, I couldn't retrieve movie details at the moment. Please try again later.");
    }
  },
};