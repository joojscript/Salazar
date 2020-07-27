const mongoose = require('mongoose');
const ServerInstances = require('./models/server_instance');

const connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});

module.exports = {
  getGuildIds: async (client) => {
    console.log(client.guilds.cache.keyArray());
    return client.guilds.cache.keyArray();
  },
  createServerInstance: async (client, message) => {
    if (!(client.guilds.cache.keyArray()[message.guild.id])) {
      const created = await ServerInstances.create({
        guild_id: message.guild.id,
        guild_name: message.guild.name,
        configs: { prefix: "$" }
      });
      console.log(created);
      return created;
    }
  },
  getServerInstance: async (message) => {
    const found = await ServerInstances.findOne({ guild_id: message.guild.id });
    return found;
  },
  setConfigs: async (message, newConfigsObject) => {
    console.log('started setting the prefix!');
    const serverInstance = await ServerInstances.findOne({ guild_id: message.guild.id });
    console.log(serverInstance);
    const result = await serverInstance.updateOne({ configs: newConfigsObject });
    console.log(result);
  },
}