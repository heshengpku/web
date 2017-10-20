var express = require('express');
var router = express.Router();

var http = require('http');
var querystring = require('querystring');

var Cert = function () {
    var certId;
    var issueDate;
    var certName;
    var description;
    var valid;
    var reason;
    var issuer;
    var owner;
};

Cert.prototype.post = function (data) {
    var contents = JSON.stringify({
        '$class': 'org.kingdee.ca.PublishCertificate',
        certId: data.certId,
        issueDate: data.issueDate,
        cert: {
            '$class': 'org.kingdee.ca.CertTemp',
            certName: data.certName,
            description: data.description,
            valid: {
                '$class': 'org.kingdee.ca.ValidPeriod',
                period: 0,
                unit: 'Forever'
            }
        },
        reason: data.reason,
        owner: 'resource:org.kingdee.ca.Issuer#' + data.owner
    });

    var options = {
        host: '123.207.51.234',
        port: '3000',
        path: '/api/PublishCertificate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': contents.length
        }
    };

    var errcode = 1;
    var data;

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (result) {
            var temp = JSON.parse(result);
            data = {
                certId: temp.certId,
                issueDate: new Date(temp.issueDate),
                certName: temp.cert.certName,
                description: temp.cert.description,
                valid: temp.cert.valid.unit === 'Forever' ? 'Forever' : temp.cert.valid.period + ' ' + temp.cert.valid.unit,
                reason: temp.reason,
                issuer: temp.issuer.replace(/\S+#/, ''),
                owner: temp.owner.replace(/\S+#/, ''),
            };
            errcode = 0;
        });
        res.on("end", function () {
            return {
                'errcode': errcode,
                'data': data
            };
        });
        res.on("error", function () {
            return {
                'errcode': 1,
                'data': []
            };
        });
    });

    req.write(contents);
    req.end();
};

Cert.prototype.postTest = function (data) {
    var contents = JSON.stringify({
        '$class': 'org.kingdee.ca.PublishCertificate',
        certId: data.certId,
        issueDate: data.issueDate,
        cert: {
            '$class': 'org.kingdee.ca.CertTemp',
            certName: data.certName,
            description: data.description,
            valid: {
                '$class': 'org.kingdee.ca.ValidPeriod',
                period: 0,
                unit: 'Forever'
            }
        },
        reason: data.reason,
        owner: 'resource:org.kingdee.ca.Issuer#' + data.owner
    });

    var errcode = 1;
    var data;

    var temp = JSON.parse(contents);
    data = {
        certId: temp.certId,
        issueDate: new Date(temp.issueDate),
        certName: temp.cert.certName,
        description: temp.cert.description,
        valid: temp.cert.valid.unit === 'Forever' ? 'Forever' : temp.cert.valid.period + ' ' + temp.cert.valid.unit,
        reason: temp.reason,
        issuer: 'Id:99999',
        owner: temp.owner.replace(/\S+#/, ''),
    };
    errcode = 0;

    return {
        'errcode': errcode,
        'data': data
    };
};

Cert.prototype.get = function (certId) {
    var options = {
        host: '123.207.51.234',
        port: '3000',
        path: '/api/queries/selectCertificatesById?certId=' + certId,
        method: 'GET'
    };

    var errcode = 1;
    var data = [];

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (result) {
            var temp = JSON.parse(result);
            for (var i in temp) {
                errcode = 0;
                var ele = {
                    certId: temp[i].certId,
                    issueDate: new Date(temp[i].issueDate),
                    certName: temp[i].cert.certName,
                    description: temp[i].cert.description,
                    valid: temp[i].cert.valid.unit === 'Forever' ? 'Forever' : temp[i].cert.valid.period + ' ' + temp[i].cert.valid.unit,
                    reason: temp[i].reason,
                    issuer: temp[i].issuer.replace(/\S+#/, ''),
                    owner: temp[i].owner.replace(/\S+#/, ''),
                };
                // console.log('certId: ' + ele.certId + '\n' +
                //     'issueDate: ' + ele.issueDate + '\n' +
                //     'certName: ' + ele.certName + '\n' +
                //     'description: ' + ele.description + '\n' +
                //     'valid: ' + ele.valid + '\n' +
                //     'issuer: ' + ele.issuer + '\n' +
                //     'owner: ' + ele.owner + '\n'
                // );
                data.push(ele);
            }
        });
        res.on("end", function () {
            return {
                'errcode': errcode,
                'data': data
            };
        });
    });

    req.on('error', function (err) {
        console.log("Got error: " + err.message);
    });
    req.end();
};

Cert.prototype.getTest = function (certId) {
    var errcode = 1;
    var data = [];

    errcode = 0;
    var ele = {
        certId: certId,
        issueDate: new Date(),
        certName: 'Test',
        description: 'Test',
        valid: 'Forever',
        reason: 'Web Test',
        issuer: 'Id:99999',
        owner: 'Id:00001',
    }
    console.log('certId: ' + ele.certId + '\n' +
        'issueDate: ' + ele.issueDate + '\n' +
        'certName: ' + ele.certName + '\n' +
        'description: ' + ele.description + '\n' +
        'valid: ' + ele.valid + '\n' +
        'issuer: ' + ele.issuer + '\n' +
        'owner: ' + ele.owner + '\n'
    );
    data.push(ele);

    return {
        'errcode': errcode,
        'data': data
    };
};

module.exports = Cert;