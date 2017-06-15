const express = require('express');
const router = express.Router();
const loginObject = require("../data/login.js");

router.post("/", (req, res) => {
    loginObject.verifyUser(req.body)
        .then((result) => {
            if (result.status == true)
                res.status(200).json(result.message);
            if (result.status == false)
                res.status(401).json(result.message);
        })

}, () => {
    // Something went wrong with the server!
    res.status(500).send();
    // });
});

module.exports = router;