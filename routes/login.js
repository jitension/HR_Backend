const express = require('express');
const router = express.Router();
const loginObject = require("../data/login.js");

// post route for login
router.post("/", (req, res) => {

    loginObject.verifyUser(req.body)
        .then((result) => {

            if (result.status)
                res.status(200).json(result);
            else
                res.status(401).json(result.message);
        });

}, () => {
    // Something went wrong with the server!
    res.status(500).send("Something went wrong with the server!");
    // });
});

module.exports = router;