const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Truck = require('./truck');

const ReviewSchema = new Schema({
  userName: String,
  image: [String],
  foodTruck: {type: Schema.Types.ObjectId, ref: 'Truck'},
  titleOfReview: String,
  content: String,
  date: Date,
  atmosphere: Number,
  value: Number,
  quality: Number,
  markedForDeletion: {
    type: Boolean,
    default: false
  },
});

const Review = mongoose.model('Review', ReviewSchema);
// https://github.com/SF-WDI-LABS/mongoose-associations
module.exports = Review;
