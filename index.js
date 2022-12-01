
const express = require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port =process.env.PORT || 5000;

const app = express();

///midlewear------
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ewvrucy.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/',async (req,res) => {
res.send('chronic ApI Running');
}); 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })  ;