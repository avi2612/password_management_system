var express = require('express');
var router = express.Router();


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

router.get('/', checkLogin, function (req, res, next) {
  req.session.destroy(function(err){
    if(err) throw err
    res.redirect('/');
})});

module.exports = router;