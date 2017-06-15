// Initial API setup

const express = require("express");
let configRoutes = require("./routes");
const bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
configRoutes(app);


// app listening on port 3000
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});