/************
 * DATABASE *
 ************/

const db = require('../models');

// CLEAN UP COMMENTS & CONSOLE.LOGS BEFORE SUBMISSION

// Try to use CRUD verbs for your controller methods (like create, show, update, etc.)
function showReviewsForTruck(req, res) {
  db.Review.find({foodTruck: req.params.truckId})
  .populate('foodTruck')
  .exec(function (err, allReviewsData) {
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
      console.log('Error in showReviewsForTruck: ', err)
    }
    res.json(arrayOfReviewsToBeShown);
  });
};

function createReview(req, res) {
  db.Review.create(req.body, function(err, newReview) {
    if (err) {
      console.log('ERROR ON createReview', err)
    }
    res.json(newReview);
  })
};

function editReview(req, res) {
  console.log('editReview route is working');
};

function deleteReview(req, res) {
  db.Review.findByIdAndUpdate(req.params.truckId, {$set: {
    markedForDeletion: req.body.markedForDeletion
  }}, {new: true}, function(err, removedReview) {
      if (err) {
        console.log ('THERE WAS AN ERROR DURING deleteReview ', err);
      }
      res.json(removedReview);
    });
};

module.exports = {
  showReviewsForTruck: showReviewsForTruck,
  createReview: createReview,
  editReview: editReview,
  deleteReview: deleteReview,
};
