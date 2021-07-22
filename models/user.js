const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { street: String, poscode: Number },
  handphone: { type: Number, required: true },
  comments: [String]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
