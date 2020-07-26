module.exports = {
  name: "config",
  description: "Configuration Command",
  args: true,
  usage: "set <SUBJECT>",
  guildOnly: true,
  execute(message, args) {
    message.channel.send(`Done configuring! ${args[0]}`);
  },
};