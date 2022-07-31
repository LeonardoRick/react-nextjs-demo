import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your on meetups and create amazing networking opportunities" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>;
    </>
  );
};
export default NewMeetup;
