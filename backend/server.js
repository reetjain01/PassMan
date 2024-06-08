const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require('cors')
dotenv.config();

// console.log(process.env.MONGO_URI);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbname = "PassMan";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

client.connect();

// get all passwords
app.get("/", async (req, res) => {
  const db = client.db(dbname);
  const collection = db.collection("documents");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save a password
app.post("/", async (req, res) => {
    const password = req.body;
  const db = client.db(dbname);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password)
  res.send({success : true, result:findResult});
});

//delete a password
app.delete("/", async (req, res) => {
    const password = req.body;
  const db = client.db(dbname);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password)
  res.send({success : true, result:findResult});
});

app.listen(port, () => {
  console.log("Listening on Port no : 3000");
});
