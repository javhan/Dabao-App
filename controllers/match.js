// DEPENDENCIES
const express = require("express");
const router = express.Router();
const Match = require("../models/match.model.js");
const User = require("../models/users.model.js")
var mongoose = require('mongoose');

// Get all match
// curl http://localhost:<PORT>/match
router.get("/:id", (req, res) => {
  console.log(req.params.id)
  Match.find({ "DBER" : req.params.id }, (err, matchFound) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    console.log(matchFound)
    res.status(200).json(matchFound);
  });
});

router.get("/", (req, res) => {
  Match.find({}, (err, allMatches) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(allMatches);
  });
});

// Get a single match by ID
// curl http://localhost:<PORT>/match/<id>

// Create a new Match
router.post("/", (req, res) => {
  req.body.DBER = new mongoose.mongo.ObjectId(req.body.DBER)
  Match.create(req.body, (error, createdMatch) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(createdMatch);
  });
});

// Delete a Match
// curl -X DELETE http://localhost:<PORT>/match/<id>
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
// '{"usermame":"I updated this"}' http://localhost:<PORT>/match/<id>
router.put("/:orderId", (req, res) => {
//  console.log("order id", req.params.orderId)
  req.body.DBEE = new mongoose.mongo.ObjectId(req.body.DBEE)
  Match.findByIdAndUpdate(
    req.params.orderId,
    {$addToSet: {Orders: [req.body]}},
    { new: true },
    (err, updatedMatch) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedMatch);
    }
  );
});


// Testing Route
router.get("/new", (req, res) => {
  res.send("MATCH NEW PAGE");
});

module.exports = router;
