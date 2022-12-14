import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  const { image, title, address, description } = props.meetup;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={classes.detail}>
        <img src={image} alt="" />
        <h1>{title}</h1>
        <address>{address}</address>
        <p>{description}</p>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const url = process.env.MONGO_URL;
  if (url) {
    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('meetups');
    // first find argument means what objects we want to return. Passing an empty object we get all.
    // second argument tels what properties we want to return from the object, and 1 is a syntax that means 'true'
    const meetups = await collection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
      fallback: 'blocking',
      paths: meetups.map((meetup) => ({
        params: {
          id: meetup._id.toString(),
        },
      })),
    };
  }
  throw Error('MONG0_URL env variable is not defined!');
}

export async function getStaticProps(context) {
  const url = process.env.MONGO_URL;
  if (url) {
    const meetupId = context.params.id;
    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('meetups');
    const meetup = await collection.findOne({ _id: ObjectId(meetupId) });
    const _id = meetup._id;
    delete meetup._id;
    return {
      props: {
        meetup: {
          ...meetup,
          id: _id.toString(),
        },
      },
    };
  }
  throw Error('MONG0_URL env variable is not defined!');
}
export default MeetupDetail;
