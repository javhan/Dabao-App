const express = require("express")
const sessions = express.Router()
const User = require("../models/users.model.js")
const bcrypt = require("bcrypt")
const methodOverride = require("method-override")

sessions.use(methodOverride("_method"))

sessions.get("/new", (req, res) => {
    res.send("testing sign up/login")
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
                res.send({ isLoggedIn: true })
            } else {
                res.send("password does not match")
            }
        }
    })
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})

module.exports = sessions