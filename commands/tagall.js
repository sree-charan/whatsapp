// commands/tagall.js
module.exports = {
    name: '.tagall',
    execute: async (message, client) => {
        try {
            const chat = await message.getChat();
            if (!chat.isGroup) {
                console.log('This command can only be used in group chats.');
                return;
            }

            const participants = [];
            for (const participant of chat.participants) {
                participants.push(await client.getContactById(participant.id._serialized));
            }

            await message.reply('*Everyone!*', undefined, { mentions: participants });
        } catch (error) {
            console.error('Error executing tagall command:', error);
            // No reply to the user, only logging the error
        }
    }
};
