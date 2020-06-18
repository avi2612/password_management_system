var express = require('express');
var router = express.Router();
var passCatModel = require("../modules/password_category");
var passDetailsModel = require("../modules/password_details");

function checkLogin(req, res, next) {

  try {
    if (req.session.userID) {}
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
  var loginUser = req.session.userName;
  var image = req.session.userIMG;

  passCatModel.find({ user_id: req.session.userID }).exec(function (error, data) {
      if (error) throw error;
      res.render('add_new_password', { title: 'Password Management System', loginUser: loginUser,image:image,success: '', records: data });
    });
  });
  
  
  router.post('/', checkLogin, function (req, res, next) {
    var loginUser = req.session.userName;
    var image = req.session.userIMG;
    var passCatName = req.body.pass_cat;
    var project_name = req.body.project_name;
    var pass_details = req.body.pass_details;

    var passDetailSave = new passDetailsModel({
      user_id: req.session.userID,
      password_category: passCatName,
      project_name: project_name,
      password_details: pass_details
    })
    passDetailSave.save(function (err, doc) { 
      if (err) throw err
    });
    passCatModel.find({ user_id: req.session.userID }).exec(function (error, data) {
      if (error) throw error
      res.render('add_new_password', { title: 'Password Management System', loginUser: loginUser, image:image, errors: '', success: 'Password added successfully', records: data });
    })
  });

  module.exports = router;
  