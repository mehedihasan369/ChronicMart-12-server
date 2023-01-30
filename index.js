
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




async function run(){
  try{
    const categoriesCollection = client.db("chronicMart").collection("categories");
    const productCollection = client.db("chronicMart").collection("products");
    const blogsCollection = client.db("chronicMart").collection("blogs");
    const usersCollection = client.db("chronicMart").collection("users");


    //////categories--api---
    app.get('/categories',async (req,res) =>{
      let query = {}

      if (req.query.id) {
        query = {
          id : req.query.id
        }
    }
      const cursor = categoriesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    })

// //////


    // app.get('/product',async (req,res) =>{
    //   const query = {}
    //   const cursor = productCollection.find(query);
    //   const product = await cursor.toArray();
    //   res.send(product);
    // })


    app.get('/category',async (req,res) =>{
      let query = {}

      if (req.query.category) {
        query = {
          category : req.query.category
        }
    }
          const cursor = productCollection.find(query);
      const category= await cursor.toArray();
      res.send(category);
    })
    //////products--api---
    


    // app.get('/category', async (req, res) => {
    //   let query = {};
  
    
   
      
    //     const cursor = productCollection.find(query);
    //           const reviews = await cursor.toArray();
    //           res.send(reviews);
    //       });
  


     ////blogs--------------
  app.get('/blogs',async (req,res) =>{
    const query = {}
    const cursor = blogsCollection.find(query);
    const blogs = await cursor.toArray();
    res.send(blogs);
  });
  app.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const blogs = await blogsCollection.findOne(query);
    res.send(blogs);
});

///////////jwt

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCECSS_TOKEN_SECRET, { expiresIn: '1h' })
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' })
        });

////////
       app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        }); 

           app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

               app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'admin' });
        });
                app.put('/users/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

  }
  finally{

  }
}
run().catch(console.log); 



//////////////////////////////

app.get('/',async (req,res) => {
res.send('chronic ApI Running');
}); 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })  ;