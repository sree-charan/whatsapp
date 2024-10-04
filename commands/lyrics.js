const axios = require('axios');

module.exports = {
  name: '.lyrics',
  description: 'Fetches the lyrics of a song based on the song name and artist name.',
  execute: async (message, args, client) => {
    // Split the arguments to get song name and artist
    const [songName, ...artistParts] = args.split(',');
    const artistName = artistParts.join(',').trim();
    const trimmedSongName = songName.trim();

    // Validate user input
    if (!trimmedSongName || !artistName) {
      await message.reply("⚠️ Please provide a song name and artist name in the format: .lyrics <song_name>, <artist_name>\nExample: .lyrics Shape of You, Ed Sheeran");
      return;
    }

    try {
      // Call the Lyrics.ovh API to get the lyrics
      const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(trimmedSongName)}`);
      const lyrics = response.data.lyrics;

      // If lyrics are found, send them; otherwise, show not found message
      if (lyrics) {
        await message.reply(`🎵 *Lyrics for "${trimmedSongName}" by ${artistName}:*\n\n${lyrics}`);
      } else {
        await message.reply(`⚠️ Sorry, I couldn't find lyrics for the song "${trimmedSongName}" by ${artistName}.`);
      }
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      await message.reply("⚠️ Sorry, I couldn't retrieve the lyrics. Please try again with a different song and artist.");
    }
  },
};
