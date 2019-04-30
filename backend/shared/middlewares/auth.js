var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');


//Authenticte using bearer token
module.exports.middleware = (req, res, next) => {
    var authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(" ")[1]
      
        jwt.verify(token, config.auth.tokenKey, (err, payload) => {
            if (payload) {
                req.user = payload;
            }
        })
    }
    next();
};


module.exports.filter = (req, res, next) => {
    if (!req.user) {
        res.unauthorized();
    } else {
        next();
    }
};

