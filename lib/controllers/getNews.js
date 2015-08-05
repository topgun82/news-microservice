var mongodb     = require( 'mongodb' );
var MongoClient = mongodb.MongoClient;

module.exports = {

findAll: function(req, res) {
  console.log('getting db connection')
  req.app.get('services').getMongoDbConnection(function(error, db) {
    console.log('got db connection')
    if (error) {
      res.send('An error has occurred !'); 
      return;
    }
    console.log('Looking up all the news articles.');
    db.collection('articles', function(error, collection) {
      collection.find().toArray(function(error, items) {
        if (error) {
          res.send('An error has occurred !');
        } else {
          console.log('Success finding all the news articles.');
          res.send(items);
          };  
        });
      });
    });
},


findByTitle: function(req, res) {
  req.app.get('services').getMongoDbConnection(function(error, db) {
    var title = req.params.title;
    console.log('Retrieving article: ' + title);
    db.collection('articles', function(error, collection) {
      collection.findOne({title:title}, function(error, item) {
         if (error) {
          res.send('An error has occurred !');
        } else {
          console.log('Success finding article: ' + title);
          res.send(item);
        };
      });
    });
  });
}

}
