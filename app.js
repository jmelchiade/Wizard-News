const express = require("express");
const app = express();
const morgan = require('morgan');
const postBank = require("./postBank");
const path= require('path')
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");




app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req, res) => {
  const posts = postBank.list()
  res.send(postList(posts))
})

app.get("/posts/:id", (req, res) => {
  const id = req.params.id
  const post = postBank.find(id)
  res.send(postDetails(post))
})


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});


