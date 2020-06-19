var express = require('express');
var router = express.Router();
var passCatModel = require("../modules/password_category");
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
    var loginUser = req.session.userName;
    var image = req.session.userIMG;

    passCatModel.find({ user_id: req.session.userID }).exec(function (err, data) {
        if (err) throw err;
        res.render('password_category', { title: 'Password Management System', records: data, loginUser: loginUser,        image:image
,        success: "" });
    })
});

router.get('/edit/:id', checkLogin, function (req, res, next) {
    var loginUser = req.session.userName;
    var image = req.session.userIMG;

    var passcatid = req.params.id;
    var passcateditdata = passCatModel.findById(passcatid);
    passcateditdata.exec(function (err, data) {
        if (err) throw err;
        res.render('edit_password_category', { title: 'Password Management System',        image:image
,        errors: "", data: data, id: passcatid, loginUser: loginUser });

    })
    passCatModel.find({ user_id: req.session.userID }).exec(function (err, data) {
        if (err) throw err;
        res.render('password_category', { title: 'Password Management System',         image:image
,        records: data, loginUser: loginUser, success: "" });
    })
});

router.post('/edit', checkLogin,

    function (req, res, next) {

        var updateid = req.body.id;
        var passCatName = req.body.passwordCategory;
        var passCatSave = passCatModel.findByIdAndUpdate(updateid, { password_category: passCatName });
        passCatSave.exec(function (err, doc) {
            if (err) throw err;
        })
        passCatModel.find({ user_id: req.session.userID }).exec(function (err, data) {

            res.redirect('/password-category');
        })
    });



router.get('/delete/:id', checkLogin, function (req, res, next) {
    var loginUser = req.session.userName;
    var passcatid = req.params.id;
    var image = req.session.userIMG;
    var deletecat = passCatModel.findByIdAndDelete(passcatid);
    deletecat.exec(function (err) {
        if (err) throw err;
    });
    passCatModel.find({ user_id: req.session.userID }).exec(function (err, data) {
        if (err) throw err;
        res.render('password_category', { title: 'Password Management System', records: data, loginUser: loginUser,image:image, success: "Deleted successfully" });
    })
});

module.exports = router;

