/************
 * DATABASE *
 ************/

const db = require('../models');

function reviewsDataForOneTruck(req, res) {
  console.log(req.params.truckId)
  console.log('Review Results is getting data')
  db.Review.find({foodTruck: req.params.truckId}, function(err, allReviewsData) {
    let arrayOfReviewsToBeShown = [];
    let arrayOfReviewsMarkedForDeletion = [];
    allReviewsData.forEach( function(reviewData) {
      if ( reviewData.markedForDeletion === false ) {
        arrayOfReviewsToBeShown.push(reviewData)
      } else {
        arrayOfReviewsMarkedForDeletion.push(reviewData);
      }
    });
    if (err) {
      console.log('reviewsDataForTruck has an error: ', err)
    }
    // can i somehow send back the name of the foodtruck with the review?
    res.json(arrayOfReviewsToBeShown);
    console.log('ReviewsData sent back: ', arrayOfReviewsToBeShown);
  });
};

function createReview(req, res) {
  console.log('createReview route is working');
  console.log(req.body)
  db.Review.create(req.body, function(err, newReview) {
    if (err) {
      console.log('ERROR ON CREATE', err)
    }
    res.json(newReview);
    console.log('NEW PROFILE INFO SENT BACK', newReview)
  })
};

function editReview(req, res) {
  console.log('editReview route is working');
};

function deleteReview(req, res) {
  console.log('deleteReview route is working');
  console.log('THIS IS THE REVIEW PARAM',req.params.truckId )
  db.Review.findByIdAndUpdate(req.params.truckId, {$set: {
    markedForDeletion: req.body.markedForDeletion
  }}, {new: true}, function(err, removedReview) {
      if (err) {
        console.log ('THERE WAS AN ERROR DURING deleteReview ', err);
      }
      console.log('deleteReview SAVED AND JSON SENT BACK ');
      res.json(removedReview);
    });
};

module.exports = {
  reviewsDataForOneTruck: reviewsDataForOneTruck,
  createReview: createReview,
  editReview: editReview,
  deleteReview: deleteReview,
};
