const mongoose = require("mongoose");

const stallsSchema = new mongoose.Schema({

});

const Stalls = mongoose.model("stalls", stallsSchema);

module.exports = Stalls;