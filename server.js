var Express = require('express'); 
var session = require('express-session');
var http = require('http'); 
var bodyParser = require('body-parser');

var app = Express(); 
var httpServer = http.createServer(app);


var allowData = function(req, res, next){
    if (req.method === 'OPTIONS'){
        var headers = {};
        headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Methods"] = "GET, POST, PUT";
        headers["Access-Control-Expose-Headers"] = "Authorization,Content-Disposition";
		headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type";	
        res.writeHead(200, headers);
	    res.end();
    }else{
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers' ,'Authorization, Content-Type');
        next();
    }
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(allowData);

app.use('/',require('./route/middleware.js'))

httpServer.listen(8095); ~
console.log("External API listeing on PORT = 8095");
