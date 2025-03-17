import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("hypernauts-db");
    const collection = db.collection("tools");

    if (req.method === "GET") {
      const tools = await collection.find({}).toArray();
      // Calculate the total quantity across all tools
      const totalQuantity = tools.reduce((sum, tool) => sum + (tool.quantity || 0), 0);
      res.status(200).json({ totalQuantity, tools });
    } else if (req.method === "POST") {
      const { name, image, quantity, category } = req.body;
      // Ensure the image path starts with "tools/"
      const fixedImagePath = image.startsWith("tools/") ? image : `tools/${image}`;
      // Automatically fix category: if provided, trim and convert to lower case; otherwise default to "uncategorized"
      const fixedCategory = category ? category.trim().toLowerCase() : "uncategorized";
      
      // Check if the tool already exists
      const existingTool = await collection.findOne({ name });
      if (existingTool) {
        // Increment the quantity (using provided quantity or defaulting to 1)
        const updatedQuantity = (existingTool.quantity || 1) + (quantity || 1);
        // Prepare fields to update. If category is provided, update it as well.
        const updateFields = {
          quantity: updatedQuantity,
          updatedAt: new Date()
        };
        if (category) {
          updateFields.category = fixedCategory;
        }
        await collection.updateOne(
          { _id: existingTool._id },
          { $set: updateFields }
        );
        res.status(200).json({ message: "Tool quantity updated successfully", quantity: updatedQuantity });
      } else {
        // Insert a new tool document with additional metadata, including the fixed category
        const newTool = {
          name,
          image: fixedImagePath,
          quantity: quantity || 1,
          category: fixedCategory,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await collection.insertOne(newTool);
        res.status(201).json({ message: "Tool added successfully", tool: newTool });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
