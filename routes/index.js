 const login = require("./login");
const signup = require("./signup");

const constructorMethod = (app) => {

     app.use("/login", login);
    app.use("/signup", signup);


    app.use("*", (req, res) => {
        res.status(404).json({ error: "server Not found" });
    });
};

module.exports = constructorMethod;