// DEPENDENCIES
const express = require("express");
const router = express.Router();
const Match = require("../models/match.model.js");
const User = require("../models/users.model.js")
var mongoose = require('mongoose');

// Get all match
// curl http://localhost:<PORT>/match
router.get("/:id", (req, res) => {
  id = mongoose.Types.ObjectId(req.params.id)
  Match.find({ "DBER" : id }, (err, matchFound) => {
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
router.get("/id/:id", (req, res) => {
  Match.findById(req.params.id, (err, matchFound) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(matchFound);
  });
});

// Get all match under same poscode
// curl http://localhost:<PORT>/users/poscode/<poscode>
router.get("/postcode/:postcode", async (req, res) => {
  // console.log(req.params.postcode)
  const match = await Match.find({ 'pickupLocation.postCode':req.params.postcode }).populate('DBER')
  res.status(200).json(match)
  // Match.find({ 'pickupLocation.postCode':req.params.postcode }, (err, matchesFound) => {
  //   if (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  //   // console.log(matchesFound)
  //   res.status(200).json(matchesFound);
  // });
});
// .populate({path: "DBER",model:"User"})

// Create a new Match
router.post("/", (req, res) => {
  req.body.DBER = mongoose.Types.ObjectId(req.body.DBER)
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

//* Insert DBEE
// curl -X PUT -H "Content-Type: application/json" -d
// '{"usermame":"I updated this"}' http://localhost:<PORT>/match/<id>
router.put("/insert/:orderId", (req, res) => {
 console.log("order id", req.params.orderId)
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

// Remove DBEE
router.put("/remove/:orderId/:dbee", (req, res) => {
  console.log("order id", req.params.orderId)
  console.log("order id", req.params.dbee)
  //  req.body.DBEE = new mongoose.mongo.ObjectId(req.body.DBEE)
   Match.findByIdAndUpdate(
     req.params.orderId,
     {$pull: {Orders: {DBEE:req.params.dbee}}},
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
