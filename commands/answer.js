const currentQuestion = require('./trivia').currentQuestion;

module.exports = {
  name: '.answer',
  description: 'Responds to the ongoing trivia question with the user’s choice.',
  execute: async (message, args, client) => {
    if (!currentQuestion) {
      await message.reply("⚠️ There's no ongoing trivia question. Start a new one with `.trivia`.");
      return;
    }

    // Parse the user’s answer
    const userAnswer = args.trim().toUpperCase();

    // Validate the answer format
    if (!['A', 'B', 'C', 'D'].includes(userAnswer)) {
      await message.reply("❗ Invalid answer format! Please use `.answer A`, `.answer B`, `.answer C`, or `.answer D`.");
      return;
    }

    // Get the correct answer index
    const correctIndex = currentQuestion.choices.indexOf(currentQuestion.correctAnswer);
    const correctOption = String.fromCharCode(65 + correctIndex); // Convert index (0, 1, 2, 3) to A, B, C, D

    // Check if the user’s answer matches the correct option
    if (userAnswer === correctOption) {
      await message.reply("✅ Correct! Well done! 🎉");
    } else {
      await message.reply(`❌ Wrong answer! The correct answer was *${correctOption}) ${currentQuestion.correctAnswer}*.`);
    }

    // Reset the current question
    currentQuestion = null;
  },
};
