import { MongoClient } from 'mongodb';
import { MONGO_URL } from '../../constants/mongo';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { title, image, address, description } = data;
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    const collection = db.collection('meetups');
    const result = await collection.insertOne({
      title,
      image,
      address,
      description,
    });
    client.close();
    res.status(201).json({ message: 'Meetup inserted' });
  }
}

export default handler;
