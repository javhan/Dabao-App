const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt")
const cors = require("cors")

require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

//middleware
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method"));
  app.use(express.static("public"));

  app.use(cors()) 
  app.use(express.json());

// Controllers
const usersController = require('./controllers/users.js');
app.use('/users', usersController);


const seed = require('./models/users.seed.js');
const User = require('./models/users.model.js');

// Seed Routes - Use once to populate DB
app.get('/seedUsers', (req, res) => {
  seed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  User.create(seed, (err, createdUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
    res.status(200).json(createdUsers);
  }
    console.log(createdUsers);
});

})

//Routes
app.get("/", (req, res) => {
    res.send("TEST FROM EXPRESS");
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