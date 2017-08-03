const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const User = require('./models/user')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/robotdb';


app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

var findBrokeRobots = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('robots');
  // Insert some documents
  collection.find({ "job": null }).toArray(function(err, result) {
    console.log("found ", result.length, " robots that need jobs")
    callback(result);
  });
}

var findNotForHire = function(db, callback){

  var collection = db.collection('robots');

  collection.find().toArray(function(err, result) {
    console.log("found ", result.length, " robots that are not for hire")
    callback(result);
  });
}
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log('error?', err);
  console.log("Connected successfully to server");


findBrokeRobots(db, function() {
  console.log('the search is done, I am Out');
  db.close();
});
});

app.get('/', function(request, response){
  response.render('robot_data');
});

app.get('/robotindex', function(request, response){
  MongoClient.connect(url, function(err, db){
   findNotForHire(db, function(result){
     response.render('robot_data', { robotdata: result });
   });
  });
});

app.get('/robotsneedwork', function(request, response){
  MongoClient.connect(url, function(err, db){
   findBrokeRobots(db, function(result){
     response.render('robot_data', { robotdata: result });
   });
  });
});

app.get('/:username', function(request, response){
  MongoClient.connect(url, function(err, db){
   findNotForHire(db, function(result){
    let person = User.fetchUser (request.params.username)
     response.render('individual_Robot', { robotdata: person });
    });
   });
 });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
