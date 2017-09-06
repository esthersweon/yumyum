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

module.exports = {
  reviewsDataForOneTruck: reviewsDataForOneTruck,
  // createNewProfile: createNewProfile,
  // showOneProfile: showOneProfile,
  // updateOneProfile: updateOneProfile,
  // removeOneProfile: removeOneProfile
};
