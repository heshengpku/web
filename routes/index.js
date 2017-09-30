var express = require('express');
var router = express.Router();

var Cert = require('../cert');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

//用户进入发证页面
router.get('/add', function (req, res) {
    res.render('add', {
        title: "发布证书"
    });
});

router.post('/add', function (req, res) {
    var cert = new Cert();
    cert.certId = req.body.certId;
    cert.issueDate = new Date();
    cert.certName = req.body.certName;
    cert.description = req.body.description;
    cert.reason = req.body.reason;
    cert.owner = req.body.owner;
    cert.add(function () {
        res.render('show', {
            title: "查验证书",
            certId: cert.certId,
            // issueDate: cert.issueDate,
            certName: cert.certName,
            // description: cert.description,
            // valid: cert.valid,
            // reason: cert.reason,
            // issuer: cert.issuer,
            // owner: cert.owner
        });
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
    var cert = new Cert();
    cert.getCert(req.body.certId, function (errcode, data) {
        var cert = data[0];
        consolo.log('e');
        res.render('show', {
            title: "查验证书",
            certId: cert.certId,
            issueDate: getTime(cert.issueDate),
            certName: cert.certName,
            description: cert.description,
            valid: cert.valid,
            reason: cert.reason,
            issuer: cert.issuer,
            owner: cert.owner
        });
    });
});

router.get('/show', function (req, res) {
    res.render('show', {
        title: "证书",
        certId: '00001',
        issueDate: '2017-09-30',
        certName: 'Test',
        description: 'Test',
        valid: 'Forever',
        issuer: 'Id:99999',
        owner: 'Id:00001'
    });
});

module.exports = router;