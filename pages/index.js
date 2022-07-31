import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MONGO_URL } from '../constants/mongo';

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
  const client = await MongoClient.connect(MONGO_URL);
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

export default Home;
