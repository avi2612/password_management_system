var express = require('express');
var router = express.Router();
var passCatModel = require("../modules/password_category");
const { check, validationResult } = require('express-validator');

function checkLogin(req, res, next) {
  
    try {
      if (req.session.userID){}
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
    res.render('add_new_category', { title: 'Password Management System', success: '', errors: '', loginUser: loginUser,image:image
  });
});

router.post('/', checkLogin,
    [check('passwordCategory', 'Enter category name').isLength({ min: 1 })],
    function (req, res, next) {
        var loginUser = req.session.userName;
        var image = req.session.userIMG;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            res.render('add_new_category', { title: 'Password Management System', loginUser: loginUser, image:image
            ,errors: errors.mapped() });
        }
        else {
            var passCatName = req.body.passwordCategory;
            var user_id=req.session.userID;
            var passCatSave = new passCatModel({
                password_category: passCatName,
                user_id:user_id
            });
            passCatSave.save(function (err, doc) {
                if (err) throw err;
                res.render('add_new_category', { title: 'Password Management System', loginUser: loginUser,        image:image
                , errors: '', success: 'Category added successfully' });

            }) 
        }
    });

module.exports = router;