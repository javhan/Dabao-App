const mongoose = require("mongoose");


const matchSchema = new mongoose.Schema({
  DBER:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  maxOrders: { type: Number, max: 2 },
  Orders: [
    {
      DBEE: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      isCompleted: {type: Boolean, default:false},
      remarks: String,
      messages: [
        {
          message: String,
          timePosted: {type: Date, default : Date.now},
          user: String,
        },
      ],
    },
  ],
  pickupLocation: { street: String, postCode: Number },
  timeAtPickUp: Date,
  orderLocation: Object,
  dishOrdered: { itemName: String, itemPrice: Number },
}, {timestamps: true});

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
