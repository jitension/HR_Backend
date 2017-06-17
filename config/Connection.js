const MongoClient = require("mongodb").MongoClient;

const settings = {
    mongoConfig: {
        //  serverUrl: "mongodb://localhost:27017/",
        serverUrl: "mongodb://heroku_fjd9fqcl:Sevenwonder7744@ds131312.mlab.com:31312/",
        database: "Honest_Response",
        
    }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined

let connectDb = () => {
    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }

    return _connection;
};

module.exports = connectDb;