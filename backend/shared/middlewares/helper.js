var express = require('express');
var config = require('../config');


//Authenticte using bearer token
module.exports.middleware = (req, res, next) => {


    res.error = (msg) => {
        res.json({ error: msg });
        return res;
    };

    res.badRequest = (msg) => {
        res.status(400);
        res.error(msg);
        return res;
    };

    res.ok = (data) => {
        if (data) {
            res.json(data);
        } else {
            res.sendStatus(200);
        }
    };

    res.unauthorized = () => {
        res.status(401);
        res.error('Unauthorized!')
        return res;
    };


    next();
};



