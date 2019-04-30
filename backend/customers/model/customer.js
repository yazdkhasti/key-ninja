var db = require('mongoose');


let customerSchema = new db.Schema({
    firstname: String,
    lastname: String,
    email: String
});

let model = db.model('Customer', customerSchema);

model.findByEmail = (email, callback) => {
    model.findOne({ 'email': email }, callback);
};




module.exports = model;