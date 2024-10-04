const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path; // Import ffmpeg path
const Util = require('whatsapp-web.js/src/util/Util'); // Utility from whatsapp-web.js to handle FFMPEG
Util.setFfmpegPath(ffmpegPath); // Set FFMPEG path for processing

module.exports = {
  name: '.sticker',
  description: 'Converts an image, video, or GIF into a WhatsApp sticker.',
  execute: async (message, args, client) => {
    // Check if the message has media attached or if it has a quoted media message
    let mediaMessage;
    if (message.hasMedia) {
      mediaMessage = message; // If the message itself has media
    } else if (message.hasQuotedMsg) {
      const quotedMsg = await message.getQuotedMessage(); // Get the quoted message
      if (quotedMsg.hasMedia) {
        mediaMessage = quotedMsg; // If the quoted message has media, use it
      }
    }

    // If no media is found in the message or quoted message, send an error
    if (!mediaMessage) {
      await message.reply("⚠️ Please send an image, video, or GIF with the `.sticker` command or quote a media message.");
      return;
    }

    try {
      // Download the media from the message
      const media = await mediaMessage.downloadMedia();

      // Validate media type
      if (!['image/jpeg', 'image/png', 'video/mp4', 'image/gif'].includes(media.mimetype)) {
        await message.reply("⚠️ Unsupported media type. Please use a JPG, PNG image, or a short MP4 video.");
        return;
      }

      // Send the media as a sticker using whatsapp-web.js's internal utility function
      await client.sendMessage(message.from, media, { sendMediaAsSticker: true });

    } catch (error) {
      console.error('Error creating sticker:', error);
      await message.reply("⚠️ Sorry, something went wrong while creating the sticker. Please try again.");
    }
  },
};
