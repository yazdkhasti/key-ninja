var mongoose = require('mongoose');
var config = require('../config');


module.exports.init = () => {
    mongoose.connect(config.db.url, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log("Database connection error:", err);
        } else {
            mongoose.set('useFindAndModify', false);
            console.log("Database connected");
        }
    });
};

