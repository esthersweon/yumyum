var express = require('express');
var app = express();

const fileUpload = require('express-fileupload');

// why use of both const and var? Keep consistent.

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var controllers = require('./controllers');

/************
* DATABASE *
************/

const db = require('./models');

/**********
* ROUTES *
**********/

app.use(express.static('public'));
app.use(fileUpload());

/*
* HTML Endpoints
*/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
* JSON API Endpoints
*/
// controller methods should be human-readable enough to not have comments
app.get('/api', controllers.api.index);
app.get('/api/foodtruckresults', controllers.truck.getTrucksMapData);
app.get('/api/:truckId/reviews', controllers.review.showReviewsForTruck);
app.post('/api/foodtruckresults', controllers.truck.createTruck)
app.put('/api/:truckId', controllers.truck.editTruck)
app.delete('/api/:truckId', controllers.truck.removeTruck)
app.post('/api/:truckId/reviews', controllers.review.createReview)
app.put('/api/:truckId/reviews', controllers.review.editReview)
app.delete('/api/:truckId/reviews', controllers.review.deleteReview)

 /**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
   console.log('Express server is up and running on http://localhost:3000/');
});
