const mongoose = require('mongoose');

const conn = async(req,res)=>{
  await mongoose.connect('mongodb+srv://hrithikmistry:h00021132@todocluster.whypv0v.mongodb.net/HomeTodo?retryWrites=true&w=majority').then(()=>{
    console.log("connected");
  });
}
conn();