import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const Home = (props) => {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups" />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </>
  );
};

export async function getStaticProps() {
  const url = process.env.MONGO_URL;
  if (url) {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const collection = db.collection('meetups');
    const result = await collection.find().toArray();
    const meetups = result.map((item) => {
      const id = item._id.toString();
      delete item._id;
      return {
        ...item,
        id,
      };
    });
    client.close();

    return {
      props: {
        meetups,
      },
      revalidate: 10,
    };
  }
  throw Error('MONG0_URL env variable is not defined!');
}

export default Home;
