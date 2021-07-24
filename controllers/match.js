// DEPENDENCIES
const express = require("express");
const router = express.Router();
const Match = require("../models/match.model.js");
const bcrypt = require("bcrypt");

// Get all match
// curl http://localhost:<PORT>/users
router.get("/", (req, res) => {
  Match.find({}, (err, allMatches) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(allMatches);
  });
});

// Get a single user by ID
// curl http://localhost:<PORT>/users/id/<id>
router.get("/id/:id", (req, res) => {
  Match.findById(req.params.id, (err, matchFound) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(matchFound);
  });
});

// Create a new user
// curl -X POST -H "Content-Type: application/json" -d
// '{"username":"TEST 123","password":"ga123"}' http://localhost:<PORT>/users
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (error, createdUser) => {
    if (error) {
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
