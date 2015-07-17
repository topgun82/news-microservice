var express = require('express');
var config  = require('./config');
var path    = require('path');
var app     = express();
var fs      = require('fs');

var sslOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
  ca: fs.readFileSync('./ssl/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

var server  = require('https').createServer(sslOptions, app);

var info = require('./lib/controllers/info');
var adds = require('./lib/controllers/addNews');
var gets = require('./lib/controllers/getNews');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());  
app.disable('etag');

app.get('/', function (req, res) {
  res.send('Hello there !\n');
});

app.post('/save', adds.addNews);
app.get('/all', gets.findAll);
app.post('/find', gets.findByTitle);

app.get('/info', function (req,res) {
  res.send(info.showInfo());
});

app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

module.exports = server;
