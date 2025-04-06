import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please add MONGODB_URI to your .env.local file. For Next.js applications, restart the development server after adding it."
  );
}

const uri = process.env.MONGODB_URI;
// Options are no longer needed in newer MongoDB driver versions (4.0.0+)
// as useNewUrlParser and useUnifiedTopology are enabled by default

let client;
let clientPromise;

// Global variable to store the promise in development mode
if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to store the connection
  // This prevents connections growing exponentially during API Route usage
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect()
      .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
        throw new Error("Unable to connect to MongoDB. Check your connection string and network.");
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection for each request
  client = new MongoClient(uri);
  clientPromise = client.connect()
    .catch(err => {
      console.error("Failed to connect to MongoDB:", err);
      throw new Error("Unable to connect to MongoDB. Check your connection string and network.");
    });
}

export default clientPromise;