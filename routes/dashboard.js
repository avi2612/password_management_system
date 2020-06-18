var express = require('express');
var router = express.Router();
var passCatModel = require("../modules/password_category");
var passDetailsModel = require("../modules/password_details");
const { check, validationResult } = require('express-validator');

function checkLogin(req, res, next) {
  try {
    if (req.session.userID) { }
    else {
      res.redirect('/');
    }
  }
  catch (err) {
    res.redirect("/");
  }
  next();
}

router.get('/', checkLogin, function (req, res, next) {
  passDetailsModel.find({user_id: req.session.userID}).count().exec((err, count) => {
    passCatModel.find({user_id: req.session.userID}).count().exec((err, countasscat) => {
      var loginUser = req.session.userName;
      var image = req.session.userIMG;
      res.render('dashboard', {
        title: 'Password Management System', msg: "",
        loginUser: loginUser,
        totalPassword: count, totalPassCat: countasscat,
        image:image
      });
    });
  })
});
module.exports = router;