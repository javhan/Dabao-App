// DEPENDENCIES
const express = require("express");
const router = express.Router();
const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/noAuth");
  }
};

// Get all users
// curl http://localhost:<PORT>/users
router.get("/", (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(allUsers);
  });
});

// Get a single user by ID
// curl http://localhost:<PORT>/users/id/<id>
router.get("/id/:id", (req, res) => {
  User.findById(req.params.id, (err, userFound) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(userFound);
  });
});

// Get all users under same poscode
// curl http://localhost:<PORT>/users/poscode/<poscode>
router.get("/postcode/:postcode", (req, res) => {
  User.find({ 'address.postCode':req.params.postcode }, (err, userFound) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(userFound);
  });
});

// Create a new user
// curl -X POST -H "Content-Type: application/json" -d
// '{"username":"TEST 123","password":"ga123"}' http://localhost:<PORT>/users
router.post("/", (req, res) => {
  console.log("body",req.body)

  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (error, createdUser) => {
    if (error) {
      // console.log("error",error)
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(createdUser);
  });
});

// Delete a user
// curl -X DELETE http://localhost:<PORT>/users/<id>
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

//* Update a user details except password
// curl -X PUT -H "Content-Type: application/json" -d
// '{"usermame":"I updated this"}' http://localhost:<PORT>/users/<id>
router.put("/:id", (req, res) => {
  delete req.body.password;
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUser);
    }
  );
});

// Testing Route
router.get("/new", (req, res) => {
  res.send("USERS NEW PAGE");
});

module.exports = router;
