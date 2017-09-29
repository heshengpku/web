var http = require('http');
var querystring = require('querystring');

var options = {
    host: '123.207.51.234',
    port: '3000',
    path: '/api/queries/selectCertificates',
    method: 'GET'
};

http.get(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (result) {
        data = [];
        if (result) {
            errcode = 0;
            temp = JSON.parse(result);
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
        } else {
            errcode = 1;
        }
    });
});

module.exports = {
    'errcode': errcode,
    'data': data
}