import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { useRouter } from "next/router";

function HomePage(props) {
  const router = useRouter();

  const deleteMeetupHandler = async (meetid) => {
    const response = await fetch("/api/meetup/delete", {
      method: "POST",
      body: JSON.stringify({meetupid: meetid}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="Browse a huge page of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} onDelete={deleteMeetupHandler} />
    </Fragment>
  );
}
export async function getServerSideProps(){
  const client = await MongoClient.connect(
    "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Meetup?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().sort({_id:-1}).toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

// export async function getStaticProps() {
//   // const client = await MongoClient.connect(
//   //   "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Meetup?retryWrites=true&w=majority"
//   // );
//   // const db = client.db();
//   // const meetupsCollection = db.collection("meetups");
//   // const meetups = await meetupsCollection.find().sort({_id:-1}).toArray();
//   // client.close();

//   // return {
//   //   props: {
//   //     meetups: meetups.map((meetup) => ({
//   //       title: meetup.title,
//   //       address: meetup.address,
//   //       image: meetup.image,
//   //       id: meetup._id.toString(),
//   //     })),
//   //   },
//   //   revalidate: 1,
//   // };
// }

export default HomePage;
