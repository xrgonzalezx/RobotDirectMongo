const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const User = require('./models/user')


app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function(request, response){
  response.render('robot_data');
});

app.get('/individual_Robot', function(request, response){
  response.render('individual_Robot', { robotdata: result });
});

app.get('/:username', function(request, response){
  let person = User.fetchUser (request.params.username)
  response.render('individual_Robot', { robotdata: person });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})





const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/robotdb';

var findBrokeRobots = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('robots');
  // Insert some documents
  collection.find({ "job": null }).toArray(function(err, result) {
    console.log("found ", result.length, " robots that need jobs")
    callback(result);
  });
}
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log('error?', err);
  console.log("Connected successfully to server");

var findNotForHire = function(db, callback){

  var collection = db.collection('robots');

  collection.find().toArray(function(err, result) {
    console.log("found ", result.length, " robots that are not for hire")
    callback(result);
  });
}

findBrokeRobots(db, function() {
  console.log('the search is done, I am Out');
  db.close();
});
