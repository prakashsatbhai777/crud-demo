import { MongoClient, ObjectId } from "mongodb";
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method = "POST") {
    const data = req.body;
    const meetid = data.meetupid;
    // const client = await MongoClient.connect(
    //   "mongodb+srv://Niranjan:Niranjan@5121@cluster0.5i6tn.mongodb.net/meetups?retryWrites=true&w=majority"
    // );
    // const client = await MongoClient.connect(
    //    "mongodb+srv://niranjan101:Q3WO8k1zV5KGo4qM@cluster0.5i6tn.mongodb.net/meetups?retryWrites=true&w=majority"
    // );

    const client = await MongoClient.connect(
      "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Meetup?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteOne({
        _id: ObjectId(meetid),
      })

    // console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Deleted" });
  }
}

export default handler;
