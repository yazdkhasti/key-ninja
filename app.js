var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to db
var db = require('./backend/shared/model');
db.init();

//Load middlewares
var helper = require('./backend/shared/middlewares/helper');
app.use(helper.middleware);

var auth = require('./backend/shared/middlewares/auth');
app.use(auth.middleware);

//Load Modules
var users = require('./backend/users');
app.use('/',  users.router);

var customers = require('./backend/customers');
app.use('/',  customers.router);


//Angular app
var angularPath = path.join(__dirname, './frontend/dist');
var angularIndexPath = path.join(angularPath, './index.html');

app.use('/',  express.static(angularPath));

app.get('/*', (req, res) => {
    res.sendFile(angularIndexPath);
})


module.exports = app;
