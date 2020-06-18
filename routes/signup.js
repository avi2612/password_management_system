var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var usersModule = require("../modules/users");
const { check, validationResult } = require('express-validator');

router.use(express.static(__dirname+"./public/"));
var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,Date.now()+"_"+file.originalname);

    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('file');

function checkEmail(req, res, next) {
    var email = req.body.email;
    var check_existing_email = usersModule.findOne({ email: email });
    check_existing_email.exec((error, data) => {
        if (error) throw error;
        if (data) {
            return res.render('signup', { title: 'Password Management System', msg: "Email already Exist" });
        }
        next();
    })
}


router.get('/', function (req, res, next) {
    if (req.session.userID) {
        res.redirect('/dashboard');
    }
    else {

        res.render('signup', { title: 'Password Management System', msg: "" });
    }

});

router.post('/', upload,checkEmail, function (req, res, next) {
if (req.file){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
    var image = req.file.filename;
    if (password != confpassword) {
        res.render('signup', { title: 'Password Management System', msg: 'Password not matching' });
    }
    else {
        password = bcrypt.hashSync(req.body.password, 10);
        var userDetails = new usersModule({
            username: username,
            email: email,
            password: password,
            image:image
        });

        userDetails.save((err, data) => {
            if (err) throw err;
            res.redirect('/dashboard');

        });
    }
}
    else{

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
    if (password != confpassword) {
        res.render('signup', { title: 'Password Management System', msg: 'Password not matching' });
    }
    else {
        password = bcrypt.hashSync(req.body.password, 10);
        var userDetails = new usersModule({
            username: username,
            email: email,
            password: password,
        });

        userDetails.save((err, data) => {
            if (err) throw err;
            res.redirect('/dashboard');

        });
    }
    }

});

module.exports = router;