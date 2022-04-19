import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import EditMeetupForm from "../../components/meetups/EditMeetupForm";

const EditMeetup = (props) => {
    const router = useRouter();
    
    async function updateMeetupHandler(enteredMeetupData) {
        const response = await fetch("/api/meetup/update", {
          method: "POST",
          body: JSON.stringify(enteredMeetupData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
    
        router.push("/");
      }

    return (
        <EditMeetupForm
            id={props.meetupData.id}
            title={props.meetupData.title}
            image={props.meetupData.image}
            address={props.meetupData.address}
            description={props.meetupData.description}
            onUpdate={updateMeetupHandler}
        />
    )
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
        params: { meetid: meetup._id.toString() },
      })),
    };
}

export async function getStaticProps(context) {
    // //fetch data for a single meetup
    const meetupId = context.params.meetid;
  
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
    console.log(selectedMeetup);
    client.close();

    // const response = await fetch("/api/get-meetup", {
    //     method: "POST",
    //     body: JSON.stringify({meetupid: meetupId}),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    // });
    // const data = await response.json();
    // console.log(data);
  
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

export default EditMeetup;