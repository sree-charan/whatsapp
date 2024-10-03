// commands/index.js
const fs = require('fs');
const path = require('path');

const commands = {};

// Load all command files
const commandFiles = fs.readdirSync(__dirname).filter(file => file !== 'index.js' && file.endsWith('.js'));

// Dynamically import each command module
for (const file of commandFiles) {
    const command = require(path.join(__dirname, file));
    commands[command.name] = command.execute;
}

module.exports = commands;
