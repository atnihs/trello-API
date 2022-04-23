import { MongoClient } from 'mongodb';
import { env } from '*/config/env';

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // connect the client to server
  await client.connect();

  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// get DB Instance
export const getDatabase = () => {
  if (!dbInstance) throw new Error('Database not yet initialized');
  return dbInstance;
};
