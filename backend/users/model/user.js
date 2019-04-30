var db = require('mongoose');


let userSchema = new db.Schema({
    email: String,
    password: String,
    lastLoginDate: Date
});

let model = db.model('User', userSchema);

model.findByEmail = (email, callback) => {
    model.findOne({ 'email': email }, callback);
};




module.exports = model;