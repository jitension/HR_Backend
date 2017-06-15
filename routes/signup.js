const express = require('express');
const router = express.Router();
const signupObject = require("../data/signup.js");

router.post("/", (req, res) => {
    signupObject.createUser(req.body).then((createdUser) => {
        
        res.status(200).json(createdUser);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

module.exports = router;