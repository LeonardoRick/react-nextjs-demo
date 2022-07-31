import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGO_URL } from '../../constants/mongo';
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
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();
  const collection = db.collection('meetups');
  // first find argument means what objects we want to return. Passing an empty object we get all.
  // second argument tels what properties we want to return from the object, and 1 is a syntax that means 'true'
  const meetups = await collection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        id: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.id;

  const client = await MongoClient.connect(MONGO_URL);
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
export default MeetupDetail;
