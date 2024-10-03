// remind.js - Command for setting reminders
module.exports = {
    name: '.remind',
    description: 'Sets a reminder for a specified message and time duration in minutes.',
    execute: async (message, args, client) => {
      // Split the arguments into message and time components
      const argsArray = args.split(' ');
      const time = parseInt(argsArray.pop(), 10); // Extract the last argument as time
      const reminderMessage = argsArray.join(' ').trim(); // Remaining arguments form the reminder message
  
      // Validate the input
      if (isNaN(time) || time <= 0 || !reminderMessage) {
        await message.reply("⚠️ Invalid command format! Please use: .remind <message> <time_in_minutes>\nExample: .remind Take a break 5");
        return;
      }
  
      // Confirm that the reminder is set
      await message.reply(`⏰ Reminder set! I'll remind you to '${reminderMessage}' in ${time} minutes.`);
  
      // Set a timeout to send the reminder after the specified time
      setTimeout(async () => {
        await message.reply(`🔔 Reminder: ${reminderMessage}`);
      }, time * 60 * 1000); // Convert minutes to milliseconds
    },
  };
  