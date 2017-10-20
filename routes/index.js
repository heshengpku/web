var express = require('express');
var router = express.Router();

var Cert = require('../lib/cert');

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

function getTime(date) {
    return date.getFullYear() + "-" +
        (date.getMonth() + 1) + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes();
}

router.post('/add', function (req, res) {
    var cert = new Cert();
    // var cert = cert.post({
    var result = cert.postTest({
        certId: req.body.certId,
        issueDate: new Date(),
        certName: req.body.certName,
        description: req.body.description,
        reason: req.body.reason,
        owner: req.body.owner
    });
    if (result.errcode == 1) {
        return res.locals.message = "发布错误";
    }
    var data = result.data;
    res.render('show', {
        title: "发布证书",
        certId: data.certId,
        issueDate: getTime(data.issueDate),
        certName: data.certName,
        description: data.description,
        valid: data.valid,
        reason: data.reason,
        issuer: data.issuer,
        owner: data.owner
    });
});

//用户进入查证页面
router.get('/check', function (req, res) {
    res.render('check', {
        title: "查验证书"
    });
});

//用户点击查证按钮
router.post('/check', function (req, res) {
    var cert = new Cert();
    // var result = cert.get(req.body.certId);
    var result = cert.getTest(req.body.certId);
    var data = result.data;
    if (result.errcode == 1) {
        return res.locals.message = "No certificate";
    }
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

router.get('/show', function (req, res) {
    res.render('show', {
        title: "证书模板",
        certId: '00001',
        issueDate: getTime(new Date()),
        certName: 'Test',
        description: 'Test',
        valid: 'Forever',
        issuer: 'Id:99999',
        owner: 'Id:00001'
    });
});

module.exports = router;