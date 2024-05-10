const mongoose = require('mongoose');
  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_CLUSTERNAME,
    DB_DATABASE
  } = process.env;
  
const conn = async(req,res)=>{
  await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTERNAME}.whypv0v.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`).then(()=>{
    console.log("connected");
  });
}
conn();