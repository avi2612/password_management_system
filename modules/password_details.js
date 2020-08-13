const mongoose = require('mongoose');
//for pagination
//npm install mongoose-pagination
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect(' Jenkins is handeling authentication to MongoDB ', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

var conn = mongoose.Collection;
var passSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    password_category: {
        type: String,
        required: true,
    },
    project_name: {
        type: String,
        required: true,
    },
    password_details: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//passing schema to plugin
passSchema.plugin(mongoosePaginate);

var passModel = mongoose.model('password_details', passSchema);
module.exports = passModel;
