var http = require('http');
var querystring = require('querystring');

var contents = JSON.stringify({ 
  '$class': 'org.kingdee.ca.Certificate',
  certId: '00001',
  issueDate: '2017-09-22T02:28:20.932Z',
  cert: { 
    '$class': 'org.kingdee.ca.CertTemp',
    certName: 'Test',
    description: 'Test',
    valid: { '$class': 'org.kingdee.ca.ValidPeriod',
        period: 0,
        unit: 'Forever' 
    } 
  },
  issuer: 'resource:org.kingdee.ca.Issuer#Id:99999',
  owner: 'resource:org.kingdee.ca.Issuer#Id:00001' 
});

var options = {
  host: '123.207.51.234',
  port: '3000',
  path: '/api/Certificate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length' : contents.length
  }
};

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (data) {
    console.log(data);
  });
});

req.write(contents);
req.end();