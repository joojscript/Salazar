const { setConfigs } = require('../database');

module.exports = {
  name: "config",
  description: "Configuration Command",
  args: true,
  usage: "set <SUBJECT>",
  guildOnly: true,
  execute(message, args) {
    if (args[0] === 'set') {
      if (args[1] === 'prefix') {
        setConfigs(message, {
          "prefix": args[2],
        });
      }
    }
  },
};