// pages/api/requests/index.js
import clientPromise from '../../../lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { equipmentName, description, quantity } = req.body;
    const newRequest = {
      requesterId: userId,        // Clerk user ID
      equipmentName,
      description,
      quantity,
      requestDate: new Date(),
      status: 'pending'           // Initial status
    };

    try {
      const result = await db.collection('equipmentRequests').insertOne(newRequest);
      newRequest._id = result.insertedId;
      return res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to submit the request' });
    }
  } else if (req.method === 'GET') {
    try {
      const requests = await db.collection('equipmentRequests').find().sort({ requestDate: -1 }).toArray();
      return res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unable to retrieve requests' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
