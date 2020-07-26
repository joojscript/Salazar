// Sets up environment variables.
require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Loading all the commands:

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // Set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}


client.once('ready', () => {
  console.log('🧙‍♂️ Emerging from the shadows!');
});

client.on('message', message => {
  // Checking wheter the message starts with a prefix or the 
  // author is Salazar himself.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Getting the args and the command sent by splitting the String in the
  // right places, and using a REGEx to cut out an enourmous amount of blank
  // spaces that could happen to be.
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Checking if the requested command is available:
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('This type of witchcraft isn\'t allowed outside a Guild!');
  }

  if (command.args && !args.length) {
    let reply = "Arguments are the Ingredients of my potions!";

    if (command.usage) {
      reply += `\nGive me my ingredients by typing:\n\`\`\`${prefix}${command.name} ${command.usage}\`\`\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('I\'m not strong enough to do this kind of wizardry!');
  }
});

client.login(process.env.SALAZAR_TOKEN);