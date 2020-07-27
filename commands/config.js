const { setConfigs } = require('../database');

module.exports = {
  name: "config",
  description: "Configuration Command",
  args: true,
  usage: "set <SUBJECT>",
  guildOnly: true,
  execute(message, args) {
    message.channel.send("came here!");
    if (args[0] === 'set') {
      message.channel.send("came set!");
      if (args[1] === 'prefix') {
        message.channel.send("came prefix!");
        setConfigs(message, {
          "prefix": args[2],
        });
      }
    }
  },
};