const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  image: [String],
  foodTruckName: String,
  titleOfReview: String,
  content: String,
  date: Date,
  atmosphere: Number,
  value: Number,
  quality: Number,
  markedForDeletion: Boolean,
});

const Review = mongoose.model('Review', ReviewSchema);
// https://github.com/SF-WDI-LABS/mongoose-associations
module.exports = Review;
