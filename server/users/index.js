var express = require('express');

var router = express.Router();


var routes = require('./routes');
router.use('/api/user', routes);



module.exports.router = router;