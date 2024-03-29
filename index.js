const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tng5w16.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const userCollection = client.db("bloodDb").collection("users");
    // const districtCollection = client.db("bloodDb").collection("districts");

    // users related api
    app.get('/users', async(req, res) =>{
      const result = await userCollection.find().toArray();
      res.send(result);
    });



    app.post('/users',async(req, res) =>{
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })



    // districts related api

    // app.get('/districts', async(req, res) =>{
    //   const cursor = jobsCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });






    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
    res.send('Blood Donation is going on')
})

app.listen(port, () => {
    console.log(`Blood Donation site is running on port: ${port}`);
})