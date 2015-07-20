var services    = require('../../services');
var mongodb     = require( 'mongodb' );
var MongoClient = mongodb.MongoClient;

module.exports = {

  deleteAllNews: function(req, res) {
    services.getMongoDbConnection(function(error, db) {
      console.log('Deleting all news articles.');
        db.collection('articles', function(error, collection) {
        collection.remove({}, function(error, item) {
         if (error) {
          res.send('An error has occurred !');
         } else {
          console.log('Success deleting all news articles.');
          res.send(item);
         };
        }); 
      });
    });
  },

 deleteByTitle: function(req, res) {
    services.getMongoDbConnection(function(error, db) {
      var title = req.params.title;
      console.log('Deleting article: ' + title);
        db.collection('articles', function(error, collection) {
        collection.remove({title:title}, {safe:true}, function(error, item) {
         if (error) {
          res.send('An error has occurred !');
         } else {
          console.log('Success deleting: ' + title);
          res.send(item);
         };
        });
      });
    });
  } 

}
