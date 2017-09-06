var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/foodtruck", {useMongoClient: true});

mongoose.Promise = global.Promise;  // use native Promise

const Truck = require('./truck');
const Review = require('./review');

module.exports.Truck = require("./truck.js");
module.exports.Review = require("./review.js");
