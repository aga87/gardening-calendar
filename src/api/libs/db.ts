import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGO_DB_URI is not defined');
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 * Source: https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c
 */

declare global {
  var mongoose: any;
}

// Create a cached object to store the Mongoose connection and promise
let cached = global.mongoose;

// If the cached object is not defined, create it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  // If the connection exists in the cache, return it
  if (cached.conn) return cached.conn;

  // If the connection promise does not exist, create it
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve and cache the connection
    cached.conn = await cached.promise;
    console.log('Connected to MongoDB');
    return cached.conn;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};
