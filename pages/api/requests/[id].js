// pages/api/requests/[id].js
import clientPromise from '../../../lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const { status, remarks } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updateData = {
      status,
      remarks,
      approvedBy: userId,  // Any signed in user can update
      decisionDate: new Date()
    };

    try {
      const result = await db.collection('equipmentRequests').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      if (!result.value) {
        return res.status(404).json({ error: 'Request not found' });
      }
      return res.status(200).json({ message: `Request ${status}`, request: result.value });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update request' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
