import { MongoClient, ObjectId } from "mongodb";
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method = "POST") {
    // const client = await MongoClient.connect(
    //   "mongodb+srv://Niranjan:Niranjan@5121@cluster0.5i6tn.mongodb.net/meetups?retryWrites=true&w=majority"
    // );
    try{
      const client = await MongoClient.connect(
        "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Meetup?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.find().sort({_id:-1}).toArray();
      client.close();

      res.status(201).json({ 
        status: "success",
        data: JSON.stringify(result),
        message: "Meetup fetch successfully."
      });
    }catch(error){
      res.status(201).json({ 
        status: "error",
        data: [],
        message: "Something went wrong."
      });
    }
  }
}

export default handler;
