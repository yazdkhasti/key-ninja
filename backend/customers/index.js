var express = require('express');
var auth = require('../shared/middlewares/auth');
var router = express.Router();


var routes = require('./routes');
router.use('/api/customer', auth.filter, routes);



module.exports.router = router;