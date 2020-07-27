const mongoose = require('mongoose');

const serverInstanceSchema = mongoose.Schema({
  guild_id: Number,
  guild_name: String,
  configs: {
    prefix: String,
  }
});

module.exports = mongoose.model('ServerInstances', serverInstanceSchema);