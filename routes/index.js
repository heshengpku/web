var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (err) {
        req.session.message = err.message;
        return res.redirect('/');
    }
});

//用户进入发证页面
router.get('/add', function (req, res) {
    res.render('add', {
        title: "发布证书"
    });
});

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

//用户点击查证按钮
router.post('/check', function (req, res) {
    
});

module.exports = router;