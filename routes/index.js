const login = require("./login");
const signup = require("./signup");
const course = require("./course");


const constructorMethod = (app) => {

// All the API routes are handled here 
    app.use("/login", login);
    app.use("/signup", signup);
    app.use('/course', course);

    // all the undefined routes will be handled here
    app.use("*", (req, res) => {
        res.status(404).json({ error: "route Not found" });
    });
};

module.exports = constructorMethod;