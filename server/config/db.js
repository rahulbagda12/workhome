const mongoose = require('mongoose');
const path = require('path');
const { JsonStore } = require('./fileStore');

const fallbackStore = new JsonStore(path.join(__dirname, '..', 'data'));

async function connectDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    fallbackStore.useFallback('Missing MONGO_URI');
    return fallbackStore;
  }

  try {
    await mongoose.connect(uri, { autoIndex: true });
    fallbackStore.disableFallback();
    return mongoose.connection;
  } catch (error) {
    fallbackStore.useFallback(error.message);
    return fallbackStore;
  }
}

module.exports = {
  connectDatabase,
  fallbackStore
};
