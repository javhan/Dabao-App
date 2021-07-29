const express = require("express")
const sessions = express.Router()
const User = require("../models/users.model.js")
const bcrypt = require("bcrypt")
const methodOverride = require("method-override")

sessions.use(methodOverride("_method"))

sessions.get("/", (req, res) => {
    res.send(req.session.currentUser)
})

//POST for logging in
sessions.post("/", (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
            // Database Problem
            res.status(400).json({ error : err.message})
        } else if (!foundUser) {
            res.status(409).json({ error : "User not found"})
        } else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.status(200).json(foundUser)
            } else {
                res.status(401).json({ error : "Password Does Not Match"})
            }
        }
    })
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
    })
})

module.exports = sessions