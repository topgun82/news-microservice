var express = require('express');
var config  = require('./config');
var path    = require('path');
var app     = express();
var server  = require('http').createServer(app);

var info   = require('./lib/controllers/info');
var adds   = require('./lib/controllers/addNews');
var gets   = require('./lib/controllers/getNews');
var delets = require('./lib/controllers/deleteNews');

var Services    = require('./services');

var services = new Services();
app.set('services',services);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());  
app.disable('etag');

app.get('/', info.showInfo);
app.post('/save', adds.addNews);
app.get('/all', gets.findAll);
app.post('/find/:title', gets.findByTitle);
app.delete('/delete', delets.deleteAllNews); 
app.delete('/delete/:title', delets.deleteByTitle);

app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

module.exports = server;
