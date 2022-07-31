import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = data;
    const MONGO_URL = process.env.MONGO_URL;
    if (MONGO_URL) {
      const client = await MongoClient.connect(MONGO_URL);
      const db = client.db();

      const collection = db.collection('meetups');
      await collection.insertOne({
        title,
        image,
        address,
        description,
      });
      client.close();
      res.status(201).json({ message: 'Meetup inserted' });
      return;
    }
    res.status(404).json({ message: 'MONGO_URL not defined' });
    return;
  }

  res.status(200).json({ message: 'not implemented' });
}

export default handler;
