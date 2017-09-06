/************
 * DATABASE *
 ************/

const db = require('../models');

function mapResultsWithOnlyTruckData(req, res) {
  console.log('Map Results is getting data')
  db.Truck.find({}, function(err, allFoodTruckResults) {
    let arrayOfFoodTrucksToBeShown = [];
    let arrayOfFoodTrucksToBeMarkedForDeletion = [];
    allFoodTruckResults.forEach( function(foodTruck) {
      if ( foodTruck.markedForDeletion === false) {
        arrayOfFoodTrucksToBeShown.push(foodTruck);
      } else {
      arrayOfFoodTrucksToBeMarkedForDeletion.push(foodTruck);
    }
    });
    res.json(arrayOfFoodTrucksToBeShown);
    console.log('DONT SEND BACK', arrayOfFoodTrucksToBeMarkedForDeletion);
  });
};


module.exports = {
  mapResultsWithOnlyTruckData: mapResultsWithOnlyTruckData,
  // createNewProfile: createNewProfile,
  // showOneProfile: showOneProfile,
  // updateOneProfile: updateOneProfile,
  // removeOneProfile: removeOneProfile
};
