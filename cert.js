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

Cert.prototype.add = function () {
    var contents = JSON.stringify({
        '$class': 'org.kingdee.ca.PublishCertificate',
        certId: this.certId,
        issueDate: this.issueDate,
        cert: {
            '$class': 'org.kingdee.ca.CertTemp',
            certName: this.certName,
            description: this.description,
            valid: {
                '$class': 'org.kingdee.ca.ValidPeriod',
                period: 0,
                unit: 'Forever'
            }
        },
        reason: this.reason,
        owner: 'resource:org.kingdee.ca.Issuer#' + this.owner
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

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            console.log(data);
        });
    });

    req.write(contents);
    req.end();

    return data;
};

Cert.prototype.getCert = function (certId) {
    var options = {
        host: '123.207.51.234',
        port: '3000',
        path: '/api/queries/selectCertificatesById?certId=' + certId,
        method: 'GET'
    };

    var errcode = 1;
    var data = [];

    var req = http.get(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (result) {
            if (result) {
                errcode = 0;
                var temp = JSON.parse(result);
                for (var i in temp) {
                    var ele = {
                        certId: temp[i].certId,
                        issueDate: new Date(temp[i].issueDate),
                        certName: temp[i].cert.certName,
                        description: temp[i].cert.description,
                        valid: temp[i].cert.valid.unit === 'Forever' ? 'Forever' : temp[i].cert.valid.period + ' ' + temp[i].cert.valid.unit,
                        reason: temp[i].reason,
                        issuer: temp[i].issuer.replace(/\S+#/, ''),
                        owner: temp[i].owner.replace(/\S+#/, ''),
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
                }
            }
        }).on("end", function () {
            console.log(errcode);
            return errcode, data;
        }).on('error', function (err) {
            console.log("Got error: " + err.message);
        });
    });

    req.end();
};

module.exports = Cert;