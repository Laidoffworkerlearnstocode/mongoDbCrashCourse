
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://laidOffWorkerLearnsToCode:mwwYNTiOQ6LYiqsZ@cluster0.kazmrmr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("sample_airbnb").collection("listingsAndReviews");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const pipeline = [
        {
          '$project': {
            '_id': 1, 
            'name': 1, 
            'price': 1, 
            'images': 1, 
            'description': 1
          }
        }, {
          '$limit': 20
        }
      ];
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").aggregate(pipeline);
    const result = await cursor.toArray();
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
