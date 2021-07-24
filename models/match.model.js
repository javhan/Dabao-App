const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({

});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;