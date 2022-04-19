import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // const client = await MongoClient.connect(
  //   "mongodb+srv://niranjan101:Q3WO8k1zV5KGo4qM@cluster0.5i6tn.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  const client = await MongoClient.connect(
    "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Meetup?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  //const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;

  // const client = await MongoClient.connect(
  //   "mongodb+srv://niranjan101:Q3WO8k1zV5KGo4qM@cluster0.5i6tn.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  const client = await MongoClient.connect(
    "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Meetup?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      revalidate: 1,
    },
  };
}

export default MeetupDetails;
