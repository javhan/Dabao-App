const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique : true },
  password: { type: String, required: true },
  address: { 
      street : { type : String, required : true},
      postCode : { type : Number, required : true }
  },
  contact : {
      hp : { type : Number, required : true },
      email : { type: String, required: true, unique : true }
  },
  isDabao : { type : String, default : "DBee" }
},{ timestamps:true });

const User = mongoose.model("user", userSchema);

module.exports = User;




// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   address: { street: String, poscode: Number },
//   contacts: { hp: Number, email: String },
// });