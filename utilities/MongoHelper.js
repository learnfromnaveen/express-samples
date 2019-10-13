var MongoClient = require("mongodb").MongoClient;

exports.MongoHelper = function() {
  this.connect = url => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (error, server) => {
        if (error) reject(error);
        resolve(server);
      });
    });
  };

  this.create = (server, database, collection, data) => {
    return new Promise((resolve, reject) => {
      var db = server.db(database);
      db.collection(collection).insertOne(data, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  };

  this.find = (server, database, collection, query) => {
    return new Promise((resolve, reject) => {
      var db = server.db(database);
      db.collection(collection).insertOne(course, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve("success");
      });
    });
  };
};
