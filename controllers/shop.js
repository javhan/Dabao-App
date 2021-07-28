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

module.exports = router;