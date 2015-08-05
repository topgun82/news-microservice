var mongodb     = require( 'mongodb' ); 
var MongoClient = mongodb.MongoClient;
var newsModel   = require('../models/newsModel'); 

exports.addNews = function(req, res) {
  services.getMongoDbConnection(function(error, db) {  
    if (error) {
      res.send('An error has occurred !'); 
      return;
    }
    var article = newsModel.populateArticle(req);
    console.log('Adding article ' + article.title + ".");
    db.collection('articles', function(error, collection) {
       collection.insert(article, {safe:true, unique:true,}, function(error, result) {
         if (error) {
           res.send('An error has occurred !');
         } else {
           console.log('Success adding article ' + article.title + ".");
           res.send(result[0]);
          };
        });
    });
  });
};
