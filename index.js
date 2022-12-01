
const express = require('express');
const cors =require('cors');
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());





const categories = require('./data/categories.json');
const blogs = require('./data/blogs.json');

app.get('/',(req,res) => {
res.send('Chronic ApI Running');
}); 
app.get('/categories',(req,res) => {
res.send(categories);
}); 
app.get('/blogs',(req,res) => {
res.send(blogs);
}); 

const courseCollection = require('./data/product.json');




app.get('/course/:id', (req, res) => {
    const id = req.params.id;
    const getSingleItem = courseCollection?.find((p) => p.id == id);
    if (!getSingleItem) {
      res.send("No Data");
    }
    res.send(getSingleItem);
  });
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const getSingleBlog = blogs?.find((p) => p.id == id);
    if (!getSingleBlog) {
      res.send("No Data");
    }
    res.send(getSingleBlog);
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })  ;