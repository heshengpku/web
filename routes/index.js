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
    data[0].certId = req.body.certId;
    data[0].issueDate = new Date();
    data[0].certName = req.body.certName;
    data[0].description = req.body.description;
    data[0].reason = req.body.reason;
    data[0].owner = req.body.owner;
    data[0].add(function () {
        res.render('show', {
            title: "查验证书",
            certId: data[0].certId,
            // issueDate: data[0].issueDate,
            certName: data[0].certName,
            // description: data[0].description,
            // valid: data[0].valid,
            // reason: data[0].reason,
            // issuer: data[0].issuer,
            // owner: data[0].owner
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
        consolo.log('e');
        res.render('show', {
            title: "查验证书",
            certId: data[0].certId,
            issueDate: getTime(data[0].issueDate),
            certName: data[0].certName,
            description: data[0].description,
            valid: data[0].valid,
            reason: data[0].reason,
            issuer: data[0].issuer,
            owner: data[0].owner
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