   // help.js - Displays a list of all available commands and their descriptions.
   module.exports = {
     name: '.help',
     description: 'Displays all available commands and their descriptions.',
     execute: async (message, args, client) => {
       const helpMessage = `
    *🤖 WhatsApp Bot - Available Commands:*

    1. *.ping* - Check if the bot is online.
    2. *.q <your query>* - Ask a question.
    3. *.meme* - Fetches a random meme and sends it as an image.
    4. *.shorten <url>* - Shortens a long URL and provides a shortened link.
    5. *.lyrics <song_name>, <artist_name>* - Fetches the lyrics for a specified song and artist.
    6. *.roast <name>* - Generates a playful roast for the specified name.
    7. *.advice* - Sends a random piece of advice.
    8. *.tagall* - Tags all participants in a group chat.
    9. *.joke* - Fetches a random joke and sends it to the chat.
    10. *.remind <message> <time_in_minutes>* - Sets a reminder for a specified message and time.
    11. *.trivia* - Starts a random trivia quiz with multiple-choice questions.
    12. *.answer <option>* - Respond to the ongoing trivia question with your answer.
    13. *.time <location>* - Gets the current time in a specified city or location.
    14. *.movie <movie_title>* - Fetches detailed information about a specified movie.
    15. *.help* - Displays this help message.

    💡 *Usage Examples:*
    - \`.ping\`
    - \`.q Tell me a joke\`
    - \`.meme\`
    - \`.shorten URL\`
    - \`.lyrics Shape of You, Ed Sheeran\`
    - \`.roast John\`
    - \`.advice\`
    - \`.tagall\`
    - \`.joke\`
    - \`.remind Drink Water 10\`
    - \`.trivia\`
    - \`.answer A\`
    - \`.time Tokyo\`
    - \`.movie Inception\`
           `;

       await message.reply(helpMessage);
     },
   };
   