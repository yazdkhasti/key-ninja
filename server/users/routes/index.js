var express = require('express');
var jwt = require('jsonwebtoken');
var auth = require('../../shared/middlewares/auth');
var config = require('../../shared/config');
var userSchema = require('../model/user');
var crypto = require("crypto");

var router = express.Router();


var computeHash = (value) => {
  var sha256 = crypto.createHash("sha256");
  sha256.update(value, "utf8");
  return sha256.digest("base64");
}

router.post('/signin', (req, res) => {
  var body = req.body;
  userSchema.findByEmail(body.email, (err, user) => {
    var jToken;
    if (user && body.password) {
      var pass = computeHash(body.password);
      if (pass === user.password) {
        var payload = { email: user.email, _id: user._id };
        jToken = jwt.sign(payload, config.auth.tokenKey);
        user.lastLoginDate = Date.UTC();
        userSchema.findByIdAndUpdate(user._id, user, (err, r) => { });
        res.ok({ token: jToken, email: user.email });
      }
    }
    if (!jToken) {
      res.error("login failed");
    }
  });

});


router.get('/', auth.filter, (req, res) => {
  var user = req.user;
  userSchema.findByEmail(user.email, (err, user) => {
    res.ok({
      email: user.email,
      lastLoginDate: user.lastLoginDate
    });
  });

});

router.post('/', (req, res) => {
  var body = req.body;
  userSchema.findByEmail(body.email, (err, user) => {
    if (!user) {
      var user = new userSchema(body);
      user.password = computeHash(body.password);
      user.save(() => {
        res.ok();
      });
    } else {
      res.badRequest("User already exists.");
    }
  });
});

module.exports = router;
