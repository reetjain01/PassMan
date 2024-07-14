const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require('cors');
dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbname = "PassMan";
const app = express();
const port = 3000; // Changed port number

app.use(bodyParser.json());
app.use(cors());

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
  } else {
    console.log('Connected successfully to MongoDB');
  }
});

// Get all passwords
app.get("/", async (req, res) => {
  try {
    const db = client.db(dbname);
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    console.log('Fetched data:', findResult);
    res.json(findResult);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save a password
app.post("/", async (req, res) => {
  try {
    const password = req.body;
    console.log('Received password:', password);

    if (!password || !password.username || !password.password) {
      res.status(400).json({ error: 'Bad Request - Missing required fields' });
      return;
    }

    const db = client.db(dbname);
    const collection = db.collection("passwords");
    const insertResult = await collection.insertOne(password);
    console.log('Inserted document:', insertResult);
    res.send({ success: true, result: insertResult });
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a password
app.delete("/", async (req, res) => {
  try {
    const password = req.body;
    console.log('Received password for deletion:', password);

    if (!password || !password.username) {
      res.status(400).json({ error: 'Bad Request - Missing required fields' });
      return;
    }

    const db = client.db(dbname);
    const collection = db.collection("passwords");
    const deleteResult = await collection.deleteOne({ username: password.username });
    console.log('Deleted document:', deleteResult);
    res.send({ success: true, result: deleteResult });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Listening on Port no: ${port}`);
  }
});
