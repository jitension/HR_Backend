const Collections = require("../config/Collections.js");
var uuid = require('uuid');
const bcrypt = require('bcrypt-nodejs');
const userCollection = Collections.users;

let exportsMethod = {

    //method to create a new user
    createUser(userInfo) {
        if (!userInfo) {
            return Promise.reject("You must provide a data!");
        }

        else {
            return userCollection().then((insertUser) => {
                return insertUser.findOne({ email: userInfo.email }).then((isDuplicate) => {
                    // checking duplicate entries in the database using email
                    if (isDuplicate)
                        return {
                            status: false,
                            message: "This email already exist"
                        };
                    else {
                        // if email is unique then create a new user
                        let newUser = {
                            _id: uuid.v4(),
                            first_name: userInfo.first_name,
                            last_name: userInfo.last_name,
                            email: userInfo.email,
                            number: userInfo.number,
                            password: bcrypt.hashSync(userInfo.password),
                        };

                        return insertUser
                            .insertOne(newUser)
                            .then((newInsertInformation) => {
                                if (newInsertInformation == null) {
                                    return Promise.reject("unable to add a User!");
                                }
                                return newInsertInformation.insertedId;
                            })
                            .then((newId) => {
                                //return newly added record
                                return this.getUserById(newId);
                            });
                    }
                });
            });
        }
    },

    // method to get users by id
    getUserById(id) {
        if (!id) {
            return Promise.reject("You must provide an id to search for");
        }
        return userCollection().then((UserData) => {
            let foundUser = UserData.findOne({ _id: id });
            return foundUser.then((result) => {
                if (result == null) {
                    return Promise.reject("User not found!");
                }
                else {
                    return result;
                }
            });
        });
    },

    // method to get all the users
    getAllUsers() {
        return userCollection().then((UserskData) => {
            return UserskData.find().toArray();
        });
    },

    // method to update the user information
    updateUser(userId, data) {
        if (!userId && !data)
            return Promise.reject("You must provide an id or data to perform update operation!");


        return userCollection().then((updateUserData) => {
            console.log(data);
            let updateUser = {
                $set:
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    number: data.number,
                }
            };

            return updateUserData.updateOne({
                _id: userId
            }, updateUser).then(() => {
                return this.getUserById(userId);
            }, (err) => {
                return Promise.reject("Cannot update this user");
            });
        });

    },

    // method to delete a user
    removeUser(id) {
        return userCollection().then((users) => {
            return users.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject(`Could not delete user with id of ${id}`);
                }
            });
        });
    }

}

module.exports = exportsMethod;