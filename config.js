var config     = module.exports;
var currentENV = process.env.NODE_ENV || "development";
var PRODUCTION = process.env.NODE_ENV === "production";
var TEST       = process.env.NODE_ENV === "test";
var S          = require('string'); 

config.express = {
  port: process.env.VCAP_APP_PORT || 3000,
  ip: process.env.VCAP_APP_HOST || "127.0.0.1"
};

//config.rabbitmq = {
//  port: process.env.RABBITMQ_PORT || 5672,
//  host: process.env.RABBITMQ_HOST || "0.0.0.0", 
//  login: process.env.RABBITMQ_USER || "guest",
//  password: process.env.RABBITMQ_PASSWORD || "guest"
//};

config.mongodb = {
  port: process.env.MONGO_PORT || 27017,
  host: process.env.MONGO_HOST || "localhost",
  db: process.env.MONGO_DATABASE || "database"
};

// only when using Docker
//if (S(config.rabbitmq.port).contains("tcp://")) {
//    config.rabbitmq.host = S(config.rabbitmq.port).between("tcp://",":").s
//    config.rabbitmq.port = S(config.rabbitmq.port).chompLeft("tcp://").s
//    config.rabbitmq.port = S(config.rabbitmq.port).between(':').s
//}

if (S(config.mongodb.port).contains("tcp://")) {
    config.mongodb.host = S(config.mongodb.port).between("tcp://",":").s
    config.mongodb.port = S(config.mongodb.port).chompLeft("tcp://").s
    config.mongodb.port = S(config.mongodb.port).between(':').s
}

if (PRODUCTION) {
  config.express.ip = "0.0.0.0";
  config.express.port = process.env.EXPRESS_PORT || 80;
}

if (TEST) {
  config.express.port = process.env.EXPRESS_PORT || 4657;
}

//config.rabbitmqURL = "amqp://" + config.rabbitmq.login + ":" + config.rabbitmq.password +
//  "@" + config.rabbitmq.host + ":" + config.rabbitmq.port;

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  config.mongodbURL = "mongodb://51f9f7a9-60d9-4330-9f12-7f9a2202a3c4:ebcce3d021a712269e15108126e8b826@192.168.2.65:27017/e2340900-38d5-4924-a96b-6dc70e67c40c"
}
else {
config.mongodbURL = "mongodb://" + config.mongodb.host + ":" + config.mongodb.port +
  "/" + config.mongodb.db + "_" + currentENV;
}

config.currentENV = currentENV;
