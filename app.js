const express = require("express");
const app = express();
const morgan = require('morgan');
const postBank = require("./postBank");
const path= require('path')
const timeAgo = require('node-time-ago');
const postList = require("./postList");
const postDetails = require("./postDetails");


app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req, res) => {
  res.send(postList(posts))
})

app.get("/posts/:id", (req, res) => {
  res.send(postDetails(posts))
})


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
