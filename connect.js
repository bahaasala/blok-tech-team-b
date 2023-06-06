const { MongoClient, ServerApiVersion } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}.dzdhppv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db(process.env.DB_NAME);

const connect = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { db, connect };
