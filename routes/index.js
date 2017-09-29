var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var db = require('../db/db');
var User = require('../db/user');
var Post = require('../db/post');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (err) {
        req.session.message = err.message;
        return res.redirect('/');
    }
});

//发布证书
router.post('/add', function (req, res, next) {
    var cert = new Cert({
        certId: certId,
        issueDate: new Date(),
        certName: certName,
        description: description,
        valid: valid,
        reason: reason,
        owner: owner,
    });
    cert.add(function (err) {
        if (err) {
            req.session.message = err.message;
            return res.redirect('/check');
        }
        req.session.success = "发证成功";
        res.redirect('/users/' + currentUser.name);
    });
});

function getTime(date) {
    return date.getFullYear() +
        "-" + date.getMonth() + 1 + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes();
}

//用户进入查证页面
router.get('/check', function (req, res) {
    res.render('check', {
        title: "查验证书"
    });
});

router.post('/check', isLogin);
//用户点击注册按钮
router.post('/check', function (req, res) {
    
});

module.exports = router;