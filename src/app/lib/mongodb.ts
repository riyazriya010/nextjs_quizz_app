import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const dbName = 'next_js'; // Make sure this matches your DB name

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }; // Return cached connection if available
  }

  // Connect to the database
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(dbName);

  return { client: cachedClient, db: cachedDb };
}
