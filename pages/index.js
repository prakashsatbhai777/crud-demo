import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function HomePage(props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMeetupHandler = async (meetid) => {
    setIsDeleting(true);
    const response = await fetch("/api/meetup/delete", {
      method: "POST",
      body: JSON.stringify({meetupid: meetid}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
    setIsDeleting(false);
  }

  let pageContent = '';

  if(props.meetups.length === 0){
    // pageContent = <LoadingSpinner />;
    pageContent = <p style={{fontSize: '30px', textAlign: 'center'}} >No meetup found.</p>;
  }

  if(props.meetups.length > 0){
    if(isDeleting){
      // pageContent = <p style={{fontSize: '30px', textAlign: 'center'}} >Deleting...</p>;
      pageContent = <LoadingSpinner />;
    }else{
      pageContent = <MeetupList meetups={props.meetups} onDelete={deleteMeetupHandler} />;
    }
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
      {pageContent}
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
