//var amqp    = require('amqp');
var mongodb = require('mongodb').MongoClient;
var config  = require('./config');

function Services() {
  var self = this;
  self.db = null;
}

Services.prototype.connect = function(cb) {
  var self = this;

  mongodb.connect(config.mongodbURL, function(err, conn) {
    if (err) return cb(err);
    self.db = conn;

    self.db.on('close', function(error) {
      //self.db = null;
    });

    cb(null,self.db);
  });
}

Services.prototype.getMongoDbConnection = function(cb) {
  var self = this;  

  if (!self.db) return self.connect(cb);

  cb(null,self.db);
}

//var rabbitmqConnection;
//
//function getRabbitMqConnection(callback) {
//    var rabbitmqURL = config.rabbitmqURL;
//
//    if (rabbitmqConnection) {
//        callback(rabbitmqConnection);
//    } else {
//        var conn = amqp.createConnection({url: rabbitmqURL});
//        conn.on('ready', function() {
//            rabbitmqConnection = conn;
//            callback(rabbitmqConnection);
//        });
//        conn.on('closed', function() {
//            rabbitmqConnection = null;
//        });
//    }
//}

module.exports = Services;
//exports.getRabbitMqConnection = getRabbitMqConnection;
