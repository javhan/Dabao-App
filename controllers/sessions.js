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
            console.log(err)
            res.send("oops the db had a problem")
        } else if (!foundUser) {
            res.send("Sorry, no user found")
        } else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                console.log(req.session.currentUser)
                res.send(foundUser)
            } else {
                res.send("password does not match")
            }
        }
    })
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
    })
})

module.exports = sessions