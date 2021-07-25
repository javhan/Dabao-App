const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  street: { type: String, required: true },
  postCode: { type: Number, required: true },
  stores: [
    {
      name: { type: String, required: true, unique: true },
      menu: [
        {
          itemName: { type: String, required: true },
          itemPrice: { type: Number, required: true },
        },
      ],
    },
  ],
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
