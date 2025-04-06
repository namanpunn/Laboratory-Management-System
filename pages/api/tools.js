import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("hypernauts-db");
    const collection = db.collection("tools");

    // Handle different HTTP methods
    switch (req.method) {
      case "GET":
        return await handleGetRequest(collection, res);
      case "POST":
        return await handlePostRequest(collection, req, res);
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: process.env.NODE_ENV === "development" ? error.message : undefined 
    });
  }
}

// Handle GET requests - fetch all tools
async function handleGetRequest(collection, res) {
  const tools = await collection.find({}).toArray();
  const totalQuantity = tools.reduce((sum, tool) => sum + (parseInt(tool.quantity) || 0), 0);
  return res.status(200).json({ totalQuantity, tools });
}

// Handle POST requests - add or update tools
async function handlePostRequest(collection, req, res) {
  const { name, image, quantity, category } = req.body;
  
  // Validate required fields
  if (!name || !image) {
    return res.status(400).json({ error: "Name and image are required fields" });
  }

  // Process input data
  const quantityNum = parseInt(quantity) || 1;
  const fixedImagePath = image.startsWith("tools/") ? image : `tools/${image}`;
  const fixedCategory = category ? category.trim().toLowerCase() : "uncategorized";
  
  try {
    // Check if the tool already exists
    const existingTool = await collection.findOne({ name });
    
    if (existingTool) {
      // Update existing tool
      const updatedQuantity = (parseInt(existingTool.quantity) || 0) + quantityNum;
      
      const updateFields = {
        quantity: updatedQuantity,
        updatedAt: new Date()
      };
      
      if (category) {
        updateFields.category = fixedCategory;
      }
      
      const result = await collection.updateOne(
        { _id: existingTool._id },
        { $set: updateFields }
      );
      
      if (result.modifiedCount === 1) {
        return res.status(200).json({ 
          message: "Tool quantity updated successfully", 
          quantity: updatedQuantity 
        });
      } else {
        return res.status(500).json({ error: "Failed to update tool" });
      }
    } else {
      // Insert new tool
      const newTool = {
        name,
        image: fixedImagePath,
        quantity: quantityNum,
        category: fixedCategory,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(newTool);
      
      if (result.insertedId) {
        return res.status(201).json({ 
          message: "Tool added successfully", 
          tool: newTool 
        });
      } else {
        return res.status(500).json({ error: "Failed to add new tool" });
      }
    }
  } catch (dbError) {
    console.error("Database operation failed:", dbError);
    return res.status(500).json({ error: "Database operation failed" });
  }
}