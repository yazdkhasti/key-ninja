var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to db
var db = require('./shared/model');
db.init();

//Load middlewares
var helper = require('./shared/middlewares/helper');
app.use(helper.middleware);

var auth = require('./shared/middlewares/auth');
app.use(auth.middleware);

//Load Modules
var users = require('./users');
app.use('/',  users.router);

var customers = require('./customers');
app.use('/',  customers.router);


//Angular app
var angularPath = path.join(__dirname, '../dist/key-ninja');
var angularIndexPath = path.join(angularPath, './index.html');

app.use('/',  express.static(angularPath));

app.get('/*', (req, res) => {
    res.sendFile(angularIndexPath);
})


module.exports = app;
