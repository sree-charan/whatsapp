const axios = require('axios');

// Global state to track ongoing trivia questions
let currentQuestion = null;

module.exports = {
  name: '.trivia',
  description: 'Fetches a random trivia question and provides multiple choices.',
  execute: async (message, args, client) => {
    // Check if there's an ongoing trivia question
    if (currentQuestion) {
      await message.reply("❗ There's already an ongoing trivia question. Use `.answer <your_option>` to answer.");
      return;
    }

    try {
      // Fetch a random trivia question from Open Trivia API
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      const questionData = response.data.results[0];

      // Parse the question and choices
      const question = questionData.question.replace(/&quot;|&#039;/g, "'");
      const correctAnswer = questionData.correct_answer.replace(/&quot;|&#039;/g, "'");
      const choices = [...questionData.incorrect_answers.map(answer => answer.replace(/&quot;|&#039;/g, "'")), correctAnswer];

      // Shuffle the choices randomly
      choices.sort(() => Math.random() - 0.5);

      // Format the question with multiple choices (A, B, C, D)
      const choiceOptions = choices.map((choice, index) => `${String.fromCharCode(65 + index)}) ${choice}`).join('\n');
      const triviaMessage = `🤔 *Trivia Time!*\n\n${question}\n\n${choiceOptions}\n\nType \`.answer <option>\` (e.g., .answer A) to answer!`;

      // Save the current question and correct answer
      currentQuestion = {
        question,
        choices,
        correctAnswer,
        messageId: message.id._serialized // Store the message ID for tracking
      };

      // Send the question to the user
      await message.reply(triviaMessage);

    } catch (error) {
      console.error('Error fetching trivia question:', error);
      await message.reply("⚠️ Sorry, I couldn't fetch a trivia question at the moment. Please try again later.");
    }
  },
};
