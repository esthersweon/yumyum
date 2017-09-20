/************
 * DATABASE *
 ************/

const db = require('../models');

var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
};

var geocoder = NodeGeocoder(options);

// make function names human-readable and concise
function getTrucksMapData(req, res) {
  db.Truck.find({}, function(err, allFoodTruckResults) {
    // make your variables as human readable as possible
    // i.e. instead of arrayOfTrucksToBeMarkedForDelete --> trucksToDelete
    let trucksToShow = [];
    let trucksToDelete = [];
    allFoodTruckResults.forEach( function(foodTruck) {
      if (!foodTruck.markedForDeletion) {
        trucksToShow.push(foodTruck);
      } else {
        //proper indentation!
        trucksToDelete.push(foodTruck);
      }
    });
    res.json(trucksToShow);
  });
};

// It's already implied that it is a new truck. try to follow CRUD naming conventions (create, show, update, etc.)
function createTruck(req, res) {
  geocoder.geocode(req.body.address, function(err, response) {
    // USE PROPER INDENTATION
    db.Truck.create(req.body, function(err, truck) {
      // IF YOU NEED TO COMMENT THIS MUCH TO MAKE IT OBVIOUS WHAT YOUR CODE IS DOING,
      // YOU SHOULD BREAK THESE LINES OUT INTO THEIR OWN FUNCTIONS THAT ARE NAMED INTUITIVELY
      // AND INVOKE THEM IN HERE (SO IT'S OBVIOUS WHAT THE CODE IS DOING)
      // E.G. saveLogoFile(); saveImageFile();

      let truckPic = req.files.logo;
      truckPic.mv('public/images/logos/' + truck._id);
      truck.logo = '/images/logos/' + truck._id;
      let truckImage = req.files.image;
      truckImage.mv('public/images/truck-image/' + truck._id);
      truck.image = '/images/truck-image/' + truck._id;

      truck.lat = response[0].latitude;
      truck.long = response[0].longitude;

      truck.save(function(err, truck) {
        if (err) {
          console.log('error', err);
        } else {
          console.log('THIS IS THE NEW TRUCK BEING CREATED ',truck);
          res.redirect('/');
          // res.json(truck);
        }
      });

    });
    // this is actually the end of the db.Truck.create callback, not geocoder
    // indent properly, and it'll be clearer where your functions start and end
  });
  // end of geocoder
}

function editTruck(req, res) {
  geocoder.geocode(req.body.address, function(err, response) {
    db.Truck.findByIdAndUpdate(req.body.id, {$set: {
      name: req.body.name,
      image: req.body.image,
      logo: req.body.logo,
      aboutTruck: req.body.aboutTruck,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      lat: response[0].latitude,
      long: response[0].longitude,
      typesOfFood: req.body.typesOfFood,
      dollarValue: req.body.dollarValue,
    }}, {new: true}, function(err, saveTruck){
      if (err) {
        console.log('error', err);
      } else {
        console.log('showing saved truck info', saveTruck)
        res.send(saveTruck)
      }
    })
  }); // end of geocoder
}

function removeTruck(req, res) {
  console.log('THIS IS THE TRUCK IDEA',req.params.truckId )
  db.Truck.findByIdAndUpdate(req.params.truckId, {$set: {
    markedForDeletion: req.body.markedForDeletion}}, {new: true}, function(err, removedTruck) {
      if (err) {
        console.log ('THERE WAS AN ERROR DURING removeOneTruck', err);
      }
      console.log('removeOneTruck SAVED and removed truck JSON sent back', removedTruck);
      res.json(removedTruck);
    });
};

module.exports = {
  getTrucksMapData: getTrucksMapData,
  createTruck: createTruck,
  editTruck: editTruck,
  removeTruck: removeTruck,
};
