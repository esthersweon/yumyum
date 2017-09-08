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
  // create a new truck route that is working 

  db.Truck.create(req.body, function(err, truck) {
    // use the fileuploader to put the image file in the right place on the server
    let truckPic = req.files.logo;
    truckPic.mv('public/images/logos/' + truck._id);
    // set the logo for that truck to the URL we just created
    truck.logo = '/images/logos/' + truck._id;
    // save and respond
    
    //Now do the same thing with the images
    let truckImage = req.files.image;
    truckImage.mv('public/images/truck-image/' + truck._id);
    truck.image = '/images/truck-image/' + truck._id;
    
    truck.save(function(err, truck) {
      if (err) { 
        console.log('error', err); 
      } else {
        console.log(truck);
        res.redirect('/')
      } 
    })

  });


}

function editTruck(req, res) {
  console.log('edit existing truck route is working')
  console.log(req.body)
  let truckPic = req.files.logo;
    truckPic.mv('public/images/logos/' + truck._id);
    // set the logo for that truck to the URL we just created
    truck.logo = '/images/logos/' + truck._id;
    // save and respond
    
    //Now do the same thing with the images
    let truckImage = req.files.image;
    truckImage.mv('public/images/truck-image/' + truck._id);
    truck.image = '/images/truck-image/' + truck._id;
    
  db.Truck.findByIdAndUpdate(req.body.id, {$set: {
    name: req.body.name, 
    image: truckImage, 
    logo: truckPic, 
    aboutTruck: req.body.aboutTruck, 
    phoneNumber: req.body.phoneNumber, 
    address: req.body.address, 
    typesOfFood: req.body.typesOfFood, 
    dollarValue: req.body.dollarValue,
  }}, {new: true}, 

  function(err, saveTruck){
    if(err) {
      console.log('error', err);
    } else {
      console.log('showing saved truck info', saveTruck)
      res.json(saveTruck);
    }
  })
}

function removeTruck(req, res) {
  console.log('delete truck route is working')
  // delete a new truck route that is working 
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
  mapResultsWithOnlyTruckData: mapResultsWithOnlyTruckData,
  createNewTruck: createNewTruck,
  editTruck: editTruck,
  removeTruck: removeTruck,
};
