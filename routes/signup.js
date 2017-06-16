const express = require('express');
const router = express.Router();
const signupObject = require("../data/signup.js");

// post route for sign up
router.post("/", (req, res) => {

    signupObject.createUser(req.body).then((createdUser) => {

        if (createdUser.status == false)
            res.status(404).json(createdUser.message);
        else
            res.status(200).json(createdUser);

    }, () => {
        // Something went wrong with the server!
        res.status(500).send("Something went wrong with the server!");
    });
});

// post route for sign up
router.post("/verifyuser", (req, res) => {
    signupObject.verifyRegisteration(req.body.email, req.body.registerationCode).then((result) => {
        console.log(result)
        if (result.status == false)
            res.status(404).json(result.message);
        else
            res.status(200).json(result.message);

    }, () => {
        // Something went wrong with the server!
        res.status(500).send("Something went wrong with the server!");
    });
});

module.exports = router;