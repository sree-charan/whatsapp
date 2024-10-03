# WhatsApp Bot

This is a Node.js-based WhatsApp bot built using the `whatsapp-web.js` library. The bot can respond to specific commands, fetch memes, tag users in a group, and interact with external APIs. It uses the Puppeteer library to automate WhatsApp Web interactions and supports a variety of commands out of the box.

## Features
- **Command-based Interactions**: Supports `.ping`, `.q`, `.meme`, and `.tagall` commands.
- **API Integration**: Makes external HTTP requests for dynamic responses.
- **Group Management**: Can tag all participants in a group.
- **Meme Generator**: Fetches random memes from a public API.
- **Session Management**: Saves session data locally to maintain the WhatsApp login state.
- **Extendable**: Easily add new commands and features.

## Prerequisites
To run this project, you need:

- **Node.js** (version >= 18.0.0)
- **npm** (version >= 8.x)
- A **WhatsApp Account** that you can scan the QR code with
- **DigitalOcean Droplet or Local Machine** to host the bot

## Installation

### Step 1: Clone the Repository
Clone this repository to your local machine or server:

```bash
git clone https://github.com/sree-charan/whatsapp.git
```

Navigate into the project directory:

```bash
cd whatsapp
```

### Step 2: Install Dependencies
Install the required npm packages:

```bash
npm install
```

### Step 3: Configure Environment Variables (Optional)
If your bot uses environment variables (e.g., for API endpoints), create a `.env` file in the root of the project:

```bash
touch .env
```

Add your environment variables:

```plaintext
API_URL=https://your-api-url.com
BOT_NAME=MyWhatsAppBot
```

### Step 4: Start the Bot
To run the bot locally, use:

```bash
npm start
```

### Step 5: Scan the QR Code
When you start the bot for the first time, a QR code will appear in the terminal. Scan the QR code using the WhatsApp app on your phone to authenticate.

Once authenticated, the bot will remain active until you manually stop it or your session expires.

## Commands
The bot supports the following commands by default:

1. **`.ping`**: Responds with `Pong!` to test if the bot is active.

   **Usage**:
   ```
   .ping
   ```

2. **`.q <your query>`**: Makes a request to the specified API endpoint with your query and responds with the output.

   **Usage**:
   ```
   .q Tell me a joke
   ```

3. **`.meme`**: Fetches a random meme from the meme API and sends it as an image.

   **Usage**:
   ```
   .meme
   ```

4. **`.tagall`**: Tags all members in a group chat with a predefined message (`@everyone`).

   **Usage**:
   ```
   .tagall
   ```

## Troubleshooting
If you encounter issues, follow these troubleshooting tips:

1. **Node.js Version Error**:
   Make sure you have Node.js 18 or higher installed. Check your version:

   ```bash
   node -v
   ```

   Upgrade Node.js if necessary.

2. **Module Not Found**:
   If you see errors related to missing modules, try reinstalling dependencies:

   ```bash
   npm install
   ```

3. **QR Code Not Appearing**:
   Ensure that the bot is correctly set up and no previous session data is conflicting. Try deleting the `.wwebjs_auth` directory and restarting:

   ```bash
   rm -rf .wwebjs_auth
   npm start
   ```

4. **Bot Stops After a Few Minutes**:
   If running on a server, consider using a process manager like `pm2` to keep the bot running:

   ```bash
   npm install -g pm2
   pm2 start main.js --name whatsapp-bot
   ```

## Running the Bot in the Background with pm2 (Optional)
To keep the bot running in the background, use `pm2`:

1. **Install `pm2` Globally**:

   ```bash
   npm install -g pm2
   ```

2. **Start the Bot**:

   ```bash
   pm2 start main.js --name whatsapp-bot
   ```

3. **Monitor the Bot**:

   ```bash
   pm2 status
   ```

## Folder Structure
Here’s a brief overview of the folder structure:

```
whatsapp/
├── commands/          # Directory containing individual command modules
│   ├── index.js       # Command handler to dynamically load all commands
│   ├── meme.js        # `.meme` command
│   ├── ping.js        # `.ping` command
│   ├── q.js           # `.q` command
│   └── tagall.js      # `.tagall` command
├── config.js          # Configuration file for constants
├── main.js            # Main entry file for starting the bot
├── package.json       # npm configuration and dependencies
├── package-lock.json  # Dependency lock file
└── README.md          # Project documentation
```

## Contributing
Contributions are welcome! If you'd like to add a new feature or fix a bug:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Make your changes and test them thoroughly.
4. Push to your branch and create a Pull Request.

## Acknowledgments
- **whatsapp-web.js** for providing the core library for interacting with WhatsApp Web.
- **puppeteer** for handling browser automation.