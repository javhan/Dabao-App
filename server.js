const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");

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


//Routes
app.get("/", (req, res) => {
    res.send("TEST");
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