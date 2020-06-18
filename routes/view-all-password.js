var express = require('express');
var router = express.Router();
var passDetailsModel = require("../modules/password_details");

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


  router.get('/',checkLogin, function(req, res, next) {
    var loginUser = req.session.userName;
    var image = req.session.userIMG;    
    var options = {
      sort: { date: 1 },
      offset:   1, 
      limit:    3
  };
  passDetailsModel.paginate({user_id:req.session.userID},options).then(function(result){
    console.log(result);
  res.render('view_all_password', { title: 'Password Management System',
  loginUser: loginUser,
  image:image,
  records: result.docs,
    current: result.offset,
    pages: Math.ceil(result.total / result.limit) ,
    success:""
  });
  
  });
  });
  
  router.get('/:page',checkLogin, function(req, res, next) {
   
    var loginUser = req.session.userName;
    var image = req.session.userIMG;
      
    var perPage = 3;
    var page = req.params.page || 1;
  
    passDetailsModel.find({ user_id: req.session.userID }).skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err,data){
  if(err) throw err;
  passDetailsModel.find({user_id: req.session.userID}).count().exec((err,count)=>{ 
    res.render('view_all_password', { title: 'Password Management System',
  loginUser: loginUser,
  image: image,
  records: data,
    current: page,
    success:"",
    pages: Math.ceil(count / perPage) 
  });
    });
  });
  });








module.exports = router;