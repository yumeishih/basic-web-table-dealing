var http = require('http');
var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express();
    app.use(express.static(path.resolve(__dirname)));
    app.get('/', function(req, res) {
        res.sendfile('Main.html');
    });

app.listen('8000');
console.log('started');