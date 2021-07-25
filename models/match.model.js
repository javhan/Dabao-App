const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  timePosted: Date,
  DBER: String,
  maxOrders: { type: Number, max: 2 },
  Orders: [
    {
      DBEE: String,
      isCompleted: Boolean,
      remarks: String,
      dishOrdered: { itemName: String, itemPrice: Number },
      messages: [
        {
          message: String,
          timePosted: Date,
          user: String,
        },
      ],
    },
  ],
  pickupLocation: { street: String, postCode: Number },
  timeAtPickUp: Date,
  orderLocation: { street: String, postCode: Number },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;

// const matchSchema = new mongoose.Schema({
//     timePosted: Date,
//     DBER: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     maxOrders: { type: Number, max: 2 },
//     Orders: [
//       {
//         DBEE: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         isCompleted: Boolean,
//         remarks: String,
//         dishOrdered: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
//         messages: [
//           {
//             message: String,
//             timePosted: Date,
//             user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//           },
//         ],
//       },
//     ],
//     pickupLocation: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     timeAtPickUp: Date,
//     orderLocation: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
//   });
