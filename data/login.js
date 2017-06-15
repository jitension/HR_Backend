const Collections = require("../config/Collections.js");
const userCollection = Collections.users;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcrypt-nodejs');

let exportsMethod = {

    verifyUser(userCredential) {
        if (!userCredential) {
            return Promise.reject("You must provide a data!");
        }
        else {
            return userCollection().then((UserData) => {

             return UserData.findOne({ email: userCredential.email })
                    .then((User) => {
                        console.log(User)
                        if (!bcrypt.compareSync(userCredential.password, User.password))
                            return {
                                status: false,
                                message: "Username and Password does not match with each other!!"
                            };
                        return {
                            status: true,
                            message: "loggied in"
                        };
                    })
            });
        }
    }
}

module.exports = exportsMethod;