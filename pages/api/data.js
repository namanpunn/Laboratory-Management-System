import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("hypernauts-db"); // Replace with your DB name
    const collection = db.collection("hypernauts-collection"); // Replace with your collection name

    if (req.method === "GET") {
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const newItem = req.body;
      await collection.insertOne(newItem);
      res.status(201).json({ message: "Item added successfully" });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("MongoDB Error:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
