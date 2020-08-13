const mongoose = require('mongoose');
mongoose.connect(' Jenkins is handeling authentication to MongoDB ', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

var conn = mongoose.Collection;
var passCateSchema = new mongoose.Schema({

    user_id: {
        type: String,
        require: true
    },

    password_category: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

var passCateModel = mongoose.model('password_category', passCateSchema);
module.exports = passCateModel;
