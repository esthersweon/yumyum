/************
 * DATABASE *
 ************/

const db = require('../models');

function mapResultsWithOnlyTruckData(req, res) {
  console.log('Map Results route is working')
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

function createNewTruck(req, res) {
  console.log('create new truck route is working')
}

function editTruck(req, res) {
  console.log('edit existing truck route is working')
}

function removeTruck(req, res) {
  console.log('delete truck route is working')
}


module.exports = {
  mapResultsWithOnlyTruckData: mapResultsWithOnlyTruckData,
  createNewTruck: createNewTruck,
  editTruck: editTruck,
  removeTruck: removeTruck
};
