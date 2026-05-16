import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@contest-hub.pzeiozv.mongodb.net/?appName=Contest-Hub`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

let db;

export const connectDB = async () => {
  if (db) return db; // যদি আগে কানেক্ট করা থাকে, সেটিই রিটার্ন করবে
  try {
    await client.connect();
    db = client.db("Contest-Hub-Management");
    return db;
  } catch (err) {
    console.error("Mongodb connection error:", err.message);
    throw err;
  }
};

export const getAllContests = async () => {
  const database = await connectDB();
  return database.collection("AllContest");
};

export const getUsers = async () => {
  const database = await connectDB();
  return database.collection("User");
};

export const getCreator = async () => {
  const database = await connectDB();
  return database.collection("Creator");
};
