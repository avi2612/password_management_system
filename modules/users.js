const mongoose = require('mongoose');
mongoose.connect(' Jenkins is handeling authentication to MongoDB ', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//{useCreateIndex: true} to use indexing, primary key

var conn = mongoose.Collection; // not use new keyword here
var userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true // if not given then throw error
    },
    email: {
        type: String,
        require: true,
        index: {
            unique: true, //email should be unique
        }
    },
    password: {
        type: String,
        require: true
    },

    image: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now // give current data of server
    }
});

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;
