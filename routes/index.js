var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var usersModule = require("../modules/users");

router.get('/', function (req, res, next) {
  if (req.session.userID) {
    res.redirect('./dashboard');
  }
  else {
    res.render('login', { title: 'avi Password Management System', msg: "" })
  }
});

router.post('/', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var checkUser = usersModule.findOne({ email: email });
  checkUser.exec((error, data) => {
    if (!data) {
     res.render('login', { title: 'Password Management System', msg: "Invalid Email Account" });
    }
    else{
    var getPassword = data.password;
    var UserID = data._id;
    var username = data.username;
    var user_image = data.image;

    if (bcrypt.compareSync(password, getPassword)) {
      req.session.userName = username;
      req.session.userID = UserID;
      req.session.userIMG = user_image;
      res.redirect('/dashboard');
    }
    else
      res.render('login', { title: 'Password Management System', msg: "Invalid Password" });
    }
  });
});

module.exports = router;
