// help.js - Command for displaying all available commands and their usage.
module.exports = {
    name: '.help',
    description: 'Displays all the available commands and their descriptions.',
    execute: async (message, client) => {
      const helpMessage = `
  Available Commands:
  
  .joke - Fetches a random joke from the JokeAPI and sends it to the chat.

  .ping - Check if the bot is online.
  
  .q <your query> - Ask a question or send a query to the API.

  .remind <message> <time_in_minutes> - Sets a reminder for a specified message and time.
  
  .meme - Fetches a random meme and sends it as an image.
  
  .tagall - Tags all participants in a group chat.
  
  .help - Displays this help message. `;
  // Send the help message as a reply to the user
  await message.reply(helpMessage);
  }, };