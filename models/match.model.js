const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  timePosted: Date,
  DBER: { type: Schema.Types.ObjectId, ref: "User" },
  maxOrders: { type: Number, max: 2 },
  Orders: [
    {
      DBEE: { type: Schema.Types.ObjectId, ref: "User" },
      isCompleted: Boolean,
      remarks: String,
      dishOrdered: { type: Schema.Types.ObjectId, ref: "Shop" },
      messages: [
        {
          message: String,
          timePosted: Date,
          user: { type: Schema.Types.ObjectId, ref: "User" },
        },
      ],
    },
  ],
  pickupLocation: { type: Schema.Types.ObjectId, ref: "User" },
  timeAtPickUp: Date,
  orderLocation: { type: Schema.Types.ObjectId, ref: "Shop" },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
