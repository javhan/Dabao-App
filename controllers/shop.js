const express = require ("express");
const router = express.Router();
const Shop = require("../models/shop.model.js")

router.get("/", (req, res) => {
    Shop.find({}, (err, allShops) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(allShops)
    })
})

router.get("/:postcode", (req,res) => {
    // console.log("postal",req.params.postalcode)
    const searchStr = req.params.postalcode.slice(0,2)
    // console.log(searchStr)
    Shop.find({ 'postalcode' :  {$regex: `^${searchStr}`}}, (err,shopsFound)=>{
        if (err) {
            res.status(400).json({ error: err.message });
          }
          res.status(200).json(shopsFound);
    })
})

module.exports = router;