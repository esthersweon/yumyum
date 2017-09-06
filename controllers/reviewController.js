/************
 * DATABASE *
 ************/

const db = require('../models');

function reviewsDataForOneTruck(req, res) {
  console.log(req.params.truckId)
  console.log('Review Results is getting data')
  db.Review.find({foodTruck: req.params.truckId}, function(err, allReviewsData) {
    if (err) {
      console.log('reviewsDataForTruck has an error: ', err)
    }
    res.json(allReviewsData);
    console.log('ReviewsData sent back: ', allReviewsData);
  });
};

function createReview(req, res) {
  console.log('createReview route is working');
};

function deleteReview(req, res) {
  console.log('deleteReview route is working');
};

module.exports = {
  reviewsDataForOneTruck: reviewsDataForOneTruck,
  createReview: createReview,
  deleteReview: deleteReview,
};
