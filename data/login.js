const Collections = require("../config/Collections.js");
const userCollection = Collections.users;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcrypt-nodejs');
const secretKey = "MyKey"; // secret key to hash password

let exportsMethod = {

    // method to authenticate user
    verifyUser(userCredential) {
        if (!userCredential) {
            return Promise.reject("You must provide a data!");
        }
        else {
            return userCollection().then((UserData) => {
                return UserData.findOne({ email: userCredential.email })
                    .then((User) => {
                        if (!User.verified) {
                            return {
                                status: false,
                                message: "Please verify before logging in!!"
                            };
                        }
                        if (!bcrypt.compareSync(userCredential.password, User.password))
                            return {
                                status: false,
                                message: "Username and Password does not match with each other!!"
                            };
                        const data = {
                            status: true,
                            message: "logged in",
                            token: jwt.sign(secretKey, User._id)
                        }
                        return data;
                    })
            });
        }
    }
}

module.exports = exportsMethod;