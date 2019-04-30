var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to db
var db = require('./server/shared/model');
db.init();

//Load middlewares
var helper = require('./server/shared/middlewares/helper');
app.use(helper.middleware);

var auth = require('./server/shared/middlewares/auth');
app.use(auth.middleware);

//Load Modules
var users = require('./server/users');
app.use('/',  users.router);

var customers = require('./server/customers');
app.use('/',  customers.router);


//Angular app
var angularPath = path.join(__dirname, './dist/key-ninja');
var angularIndexPath = path.join(angularPath, './index.html');

app.use('/',  express.static(angularPath));

app.get('/*', (req, res) => {
    res.sendFile(angularIndexPath);
})


module.exports = app;
