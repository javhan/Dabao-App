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

// Create a new Match
router.post("/", (req, res) => {
  Match.create(req.body, (error, createdMatch) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(createdMatch);
  });
});

// Delete a Match
// curl -X DELETE http://localhost:<PORT>/Match/<id>
router.delete("/:id", (req, res) => {
  Match.findByIdAndRemove(req.params.id, (err, deletedMatch) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedMatch);
  });
});

//* Update a Match details 
// curl -X PUT -H "Content-Type: application/json" -d
// '{"usermame":"I updated this"}' http://localhost:<PORT>/users/<id>

// Testing Route
router.get("/new", (req, res) => {
  res.send("MATCH NEW PAGE");
});

module.exports = router;
