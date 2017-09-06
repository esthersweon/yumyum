//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// manages the controller routes
var controllers = require('./controllers');

/************
* DATABASE *
************/

const db = require('./models');

/**********
* ROUTES *
**********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
* HTML Endpoints
*/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
* JSON API Endpoints
*/
// render just the API information
app.get('/api', controllers.api.index);


 /**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
   console.log('Express server is up and running on http://localhost:3000/');
});
