const express = require('express');
const app = express();
 const auth = require("./routes/auth");
 const project = require("./routes/project");
 const tasks = require("./routes/Tasks");
 require('dotenv').config();
require('./conn/conn');

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.get("/",(req,res)=>{
 res.send("hello this is the homepage");
});
app.use('/api/v2',project);
app.use('/api/v2',tasks);
app.use('/api/v1',auth);
app.listen(1000, ()=>{
  console.log("server started");
});