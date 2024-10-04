const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
  name: '.gm',
  description: 'Fetches media or text from a quoted message and resends it.',
  execute: async (message, args, client) => {
    console.log("Fetching media from quoted message...");

    // Check if the message has a quoted message
    if (!message.hasQuotedMsg) {
      await message.reply("⚠️ Please quote a message that has media or text to use the `.gm` command.");
      return;
    }

    try {
      // Fetch the quoted message
      const quotedMsg = await message.getQuotedMessage();

      // If the quoted message has media, download and send it
      if (quotedMsg.hasMedia) {
        const media = await quotedMsg.downloadMedia();

        if (!media) {
          await message.reply("⚠️ Sorry, I couldn't download the media from the quoted message.");
          return;
        }

        // Send the media as a new message
        await client.sendMessage(message.from, new MessageMedia(media.mimetype, media.data, media.filename), {
          caption: args || quotedMsg.body || '', // Set caption from args or original quoted text
        });

      } else {
        // If the quoted message is text-only, resend the text content
        await message.reply(`${quotedMsg.body}`);
      }
    } catch (error) {
      console.error('Error fetching quoted message:', error);
      await message.reply("⚠️ Sorry, something went wrong while processing the quoted message. Please try again.");
    }
  },
};
