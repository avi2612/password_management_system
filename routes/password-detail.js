var express = require('express');
var router = express.Router();
var passCatModel = require("../modules/password_category");
var passDetailsModel = require("../modules/password_details");
const { check, validationResult } = require('express-validator');

function checkLogin(req, res, next) {

  try {
    if (req.session.userID) {
    }
    else {
      res.redirect('/');
    }
  }
  catch (err) {
    res.redirect("/");
  }
  next();
}

router.get('/edit/:id', checkLogin, function (req, res, next) {
  var loginUser = req.session.userName;
  var image = req.session.userIMG;

  var id = req.params.id;
    var getPassDetails = passDetailsModel.findById({ _id: id });
    passCatModel.find({ user_id: req.session.userID }).exec(function (err, data1) {
      if (err) throw err;
      getPassDetails.exec(function (err, data2) {
        var image = req.session.userIMG;
        res.render('edit_password_detail', { title: 'Password Management System'
,        loginUser: loginUser, record_cat: data1, record_pass: data2,image:image, success: '' });
      });
    });
  });
  
  router.post('/edit/:id', checkLogin, function (req, res, next) {
    var id = req.params.id;
    var passcat = req.body.pass_cat;
    var project_name = req.body.project_name;
    var pass_details = req.body.pass_details;
    passDetailsModel.findByIdAndUpdate(id, { password_category: passcat, project_name: project_name, password_detail: pass_details }).exec(function (err) {
      if (err) throw err;
    })
    passDetailsModel.find({ user_id: req.session.userID }).exec(function (err, data) {
      if (err) throw err;
      res.redirect('/view-all-password');
    });
  });
  
  router.get('/delete/:id', checkLogin, function (req, res, next) {
    var id = req.params.id;
    var passdelete = passDetailsModel.findByIdAndDelete(id);
    passdelete.exec(function (err) {
      if (err) throw err;
      res.redirect('/view-all-password');
    });
  });
  

module.exports = router;