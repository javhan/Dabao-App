const express = require("express");
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./dabao/build")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Controllers
const usersController = require("./controllers/users.js");
app.use("/users", usersController);
const shopController = require("./controllers/shop.js");
app.use("/shop", shopController);
const matchController = require("./controllers/match.js")
app.use("/match", matchController);
const sessionsController = require("./controllers/sessions.js")
app.use("/sessions", sessionsController)

const seed = require("./models/users.seed.js");
const User = require("./models/users.model.js");
const seedShop = require("./models/shop.seed.js");
const Shop = require("./models/shop.model.js");
const seedMatch = require("./models/match.seed.js")
const Match = require("./models/match.model.js")

// Seed Routes - Use once to populate DB
// app.get("/seedUsers", (req, res) => {
//   seed.forEach((user) => {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//   });
//   User.create(seed, (err, createdUsers) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else {
//       res.status(200).json(createdUsers);
//     }
//     console.log(createdUsers);
//   });
// });

app.get("/seedShops", (req, res) => {
  Shop.create(seedShop, (err, createdShops) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json(createdShops);
    }
    console.log(createdShops);
  });
});
app.get("/seedMatch", (req, res) => {
  Match.create(seedMatch, (err, createdMatch) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json(createdMatch);
    }
    console.log(createdMatch);
  });
});

//Routes
// app.get("/", (req, res) => {
//   res.send("TEST FROM EXPRESS");
// });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dabao/build", "index.html"));
});



app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});


mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
