const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require('cors');
dotenv.config();

const client = new MongoClient('mongodb+srv://passman:passman@cluster0.afcyc3n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const dbname = "PassMan"; // Database name in Atlas
const app = express();
const process = require("process");
const port = process.env.PORT || 3000; // Changed port number

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

// Update a password
app.put("/", async (req, res) => {
  const { id, site, username, password } = req.body;
  const db = client.db(dbname);
  const collection = db.collection("passwords");
  
  try {
    const filter = { id: id }; // Assuming id is the unique identifier
    const updateDoc = {
      $set: { site: site, username: username, password: password }
    };
    
    const result = await collection.updateOne(filter, updateDoc);
    
    if (result.modifiedCount === 1) {
      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.json({ success: false, message: "Password not found or not updated" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete a password
app.delete("/", async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbname);
  const collection = db.collection("passwords");

  try {
    const result = await collection.deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: "Password deleted successfully" });
    } else {
      res.json({ success: false, message: "Password not found or not deleted" });
    }
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Listening on Port no: ${port}`);
  }
});
