var Mongoose   = require('mongoose');

var DBSchema = { 
 User: Mongoose.Schema({
    firstName: String, 
    lastName: String,  
    email: String, 
    username: String,  
    password: String
    })
}

module.exports = DBSchema;
