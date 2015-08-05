var app    = require('./index');
var config = require('./config');
var bole   = require('bole');
var services = require('./services');

bole.output({level: "debug", stream: process.stdout});
var log = bole("server");
log.info({env: process.env.NODE_ENV}, "Server process starting");

app.listen(config.express.port, config.express.ip, function(error) {
  if(error) {
    log.error("Unable to listen for connections", error);
    process.exit(10);
  }
  log.info("Server is listening on http://" +
  config.express.ip + ":" + config.express.port);
});