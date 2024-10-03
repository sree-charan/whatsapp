// main.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const commands = require('./commands');
const { WHATSAPP_AUTH_DIR } = require('./config');

// Initialize the WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth({ dataPath: WHATSAPP_AUTH_DIR }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

// Display QR code for authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code received. Scan it using your WhatsApp app.');
});

// Log when authenticated
client.on('authenticated', () => {
    console.log('Authenticated successfully!');
});

// Log when ready
client.on('ready', () => {
    console.log('WhatsApp is ready!');
});

// Unified Event Handler for Messages
client.on('message_create', async (message) => {
    console.log(`Message detected: ${message.body} | From: ${message.from} | FromMe: ${message.fromMe}`);

    // Parse the command and arguments
    const [command, ...args] = message.body.trim().split(' ');

    // Check if the command exists in the command handler
    if (commands[command]) {
        try {
            await commands[command](message, args.join(' '), client); // Pass message, args, and client
        } catch (err) {
            console.error(`Error executing command ${command}:`, err);
            // No reply to the user, only logging the error
        }
    }
});

// Initialize the client
client.initialize();
