console.log('app.js is still linked')
$(document).ready(function(){

  // //initialize all modals
  //  $('.modal').modal();
   $('.modal').modal();



  $.ajax({
    method: 'GET',
    url: '/api/foodtruckresults',
    success: renderAllTrucks
  });

// creating truck
 $('#truck-form form').on('submit', function(e) {
    e.preventDefault();

    var formData = $(this).serialize();
    console.log('formData', formData);

    $.post('/api/foodtruckresults', formData, function(truck) {
      console.log('truck after POST', truck);
      renderTruck(truck);  //render the server's response
    });
    $(this).trigger("reset");
  });


// $('#modal1').on('click',  function () {
// 	console.log('model has been clicked')


// })
// the document is referring to the actual html page. saying once the HTML page is loaded ilisten for the click on the 'modal-triggers' and then open
// this is to edit the truck
// $(document).on("click", ".modal-triggers", function() {
// 	$("#modal1").modal("open");
// });

$(document).on("click", ".modal-triggers", editTruck);

$(document).on("click", ".save-truck-edit", SaveTruck);

$(document).on('click', '.delete-truck', removeTruck);

$(document).on('click', '.read-truck-reviews', renderAllReview);

$(document).on('click', '.delete-review', deleteReview);

$(document).on('click', '.write-truck-review', writeReviewInputOpen);

$(document).on('click', '.write-truck-review-submit', writeReviewSubmit);

function renderAllTrucks (trucks) {
	trucks.forEach(function (truck) {
		console.log(trucks)
		renderTruck(truck);
	});
}

function SaveTruck(e) {
	e.preventDefault();
	console.log('HELLO')
	var saveData = $('#edit-truck-form').serialize();
    var truckId = $('#edit-truck-form').find('.truck-id').val();
    console.log('THIS IS TRUCK ID ', truckId)
    $.ajax({
    	method: 'PUT',
    	url: '/api/' + truckId,
    	data: saveData,
    })
    .then(function(savedTruckData) {
    	console.log('DATA IS HERE', savedTruckData);

    	$('[data-truck-id =' + truckId + ']').remove();

    	renderTruck(savedTruckData);

    	$('[data-truck-id =' + truckId + ']')[0].scrollIntoView();


    })

}

function editTruck() {
	$("#modal1").modal("open");

	var truckJson = JSON.parse($(this).attr("data-truck"));
	console.log('STRINGIFY THE NAME HERE', truckJson.name)

	var editTruckHtml = `

		<section id='truck-form' class="container">
  <div class="row">
    <form id="form" class="col s12">
                                <!-- Truck Name  -->
      <div class="row">
        <div class="input-field col s6">
          <input value='${truckJson.name}'  name='name' placeholder="Truck Name"  id="truck_name" type="text" class="validate">
          <label class='active' for="truck_name">Truck Name</label>
        </div>
      </div>
                                 <!-- About Truck  -->
      <div class="row">
        <div class="input-field col s6">
          <input value='${truckJson.aboutTruck}'  name='aboutTruck' placeholder="History of Truck" id="about_truck" type="text" class="validate">
          <label class='active' for="about_truck">About Truck</label>
        </div>
      </div>
                                  <!-- Truck Address  -->
      <div class="row">
        <div class="input-field col s6">
          <input value='${truckJson.address}' name='address' placeholder="Enter prime location or stop address" id="truck_address" type="text" class="validate">
          <label class='active' for="truck_address">Truck Address</label>
        </div>
      </div>
                                  <!-- Phone Number  -->
      <div class="row">
        <div class="input-field col s6">
          <input value='${truckJson.phoneNumber}' name='phoneNumber' placeholder="Please enter phone number" id="truck_phonenumber" type="tel" class="validate">
          <label class='active' for="number">Phone Number</label>
        </div>
      </div>
                                   <!-- Food Type -->
      <div class="row">
        <div class="input-field col s6">
          <input value='${truckJson.typesOfFood}'  name='typesOfFood' placeholder="PLease enter style or types of food served" id="truck_foodtype" type="text" class="validate">
          <label class='active' for="truck_foodtype">Food Type</label>
        </div>
      </div>
                                  <!-- Truck Price  -->
       <div class="row">
        <div class="input-field col s6">
          <input value='${truckJson.dollarValue}' name='dollarValue' placeholder="Average price of food" id="truck_prices" type="text" class="validate">
          <label class='active' for="truck_prices">Truck Prices</label>
        </div>
      </div>
                                  <!-- Single Logo File Upload  -->
    <div class="row">
      <div class="file-field input-field col s6">
        <div class="btn">
          <span>File</span>
          <input type="file">
        </div>
        <div class="file-path-wrapper">
          <input class='active' value='${truckJson.logo}' name='logo' id='trucklogo' class="file-path validate" type="text" placeholder="Upload company logo">
        </div>
      </div>
    </div>
                                  <!-- Multiple file upload  -->
    <div class="row">
      <div class="file-field input-field col s6">
        <div class="btn">
          <span>File</span>
          <input type="file" multiple>
        </div>
        <div class="file-path-wrapper">
          <input class='active' value='${truckJson.image}' name='image' id='truck_images' class="file-path validate" type="text" placeholder="Upload images of company food">
        </div>
      </div>
      <input value='${truckJson._id}'  name='id' placeholder="Truck Name"  id="truck_name" type="text" class="validate truck-id" hidden>
        <div class='truck-footer' >
                <!-- The save changes button will be toggled  -->
             <button class='btn btn-info black save-truck-edit' type="submit" >Submit</button>
        </div>
    </div>
  </form>
</div>
</section>


	`;

	$("#edit-truck-form").html(editTruckHtml);

	// Step 1: Take JSON and create form fields with it
	// Step 2: Replace HTML of modal body with newly-created form fields

	// run modal input field

}


// render shop function
function renderTruck(truck) {
	console.log('Rending the damn trucks', truck)

var trucksHTML = (`

	 	  <div class="card card-truck" data-truck-id="${truck._id}">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${truck.logo}">

            </div>
            <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${truck.typesOfFood}<i class="material-icons right"></i></span>
              <p><a href="#">${truck.dollarValue}</a></p>

            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${truck.address}<i class="material-icons right">${truck.phoneNumber}</i></span>
              <img class="activator" src="${truck.image}">
              <p>${truck.aboutTruck}</p>
            </div>
              <div class='card-footer' >

				<!-- Modal Trigger -->
  				<a class="waves-effect waves-light btn modal-triggers" data-truck='${JSON.stringify(truck)}'>Edit Truck</a>
              <button class='btn btn-danger red delete-truck'>Delete Truck</button>
              <button class='btn btn-danger yellow read-truck-reviews review-buttons'>Read Reviews</button>
              <button class='btn btn-danger blue write-truck-review review-buttons'>Write A Review</button>
            </div>
          </div>`);




$('#trucks').prepend(trucksHTML)

};



   // end of document.ready
});


var trucksHTMLForm = function (truckData) { `

`}

function removeTruck () {

 console.log('THIS IS TRUCK ID ', truckId)

var truck = $(this).closest('.card-truck');
console.log(truck);
var truckId = truck.data('truck-id')
console.log('gotId', truckId)
var removeTruckData = {
	markedForDeletion: true,
}
$.ajax ({
    method: 'delete',
    url: '/api/' + truckId,
   	data: removeTruckData,
  })
.then(function (truckRemoved) {
	console.log('This truck has been removed', truckRemoved);
	truck.remove()
});
}






































function renderAllReview (reviews) {

  console.log('read reviews button is working');
  let currentTruckId
  currentTruckId = $(this).closest('.card-truck').attr('data-truck-id');
  console.log('gotId', currentTruckId)
  $.ajax({
  method: 'GET',
  url: '/api/' + currentTruckId + '/reviews'
  })
  .then(function(currentProfileData) {
    $('.review-information').fadeOut(300, function() {
      $(this).remove();
    });
    console.log('THIS IS THE renderAllReview data coming back', currentProfileData);
    currentProfileData.forEach(function (review) {
      renderReview(review);
    });
  })
  .catch(function(err) {
    console.log('renderAllReview failed ', err)
  });



}


// render one review
function renderReview(review) {
	console.log('Rendering one single review', review);

  // goes through the array of review.image and then creates a new array with the img src tag. then it joins the imge together into one string
  let imgHTML = review.image.map(x => `<img src='${x}'/>`).join('');

var reviewHTML = (`
    <div class="review-information" data-review-id='${review._id}'>
      <div class="row reviews">
        <div class="col s12 review-information-info">
          <div>
            <h2 class='reviews' name='reviews' value=''></h2>
          </div>
          <div>
            <div>
              <span class='reviews-atmosphere reviews' name='atmosphere' value=''>atmosphere: ${review.atmosphere}</span>
            </div>
            <div>
              <span class='reviews-value reviews' name='value' value=''>value: ${review.value}</span>
            </div>
            <div>
              <span class='reviews-quality reviews' name='quality' value=''>quality: ${review.quality}</span>
            </div>
            <div>
              <span class='reviews-userName reviews' name='userName' value=''>userName: ${review.userName}</span>
            </div>
            <div>
              <span class='reviews-date reviews' name='date' value=''>date: ${review.date}</span>
            </div>
            <div>
              <span class='reviews-foodTruck reviews' name='foodTruck' value=''>Name of Food Truck (id): ${review.foodTruck}</span>
            </div>
            <div>
              <span class='reviews-titleOfReview reviews' name='titleOfReview' value=''>Title Of Review: ${review.titleOfReview}</span>
            </div>
            <div>
              <span class='reviews-content reviews' name='content' value=''>Content: ${review.content}</span>
            </div>
            <div>
              <span class='reviews-image reviews' name='image' value=''>${imgHTML}</span>
            </div>
          </div>
        </div>
      </div>
      <button class='btn btn-danger red delete-review'>Delete Review</button>
    </div>
    `);

  $('#adding-review').append(reviewHTML)



};

function deleteReview() {
  console.log('deleteReview is working')
  let reviewId
  reviewId = $(this).closest('.review-information').attr('data-review-id');
  console.log('deleteReview ID', reviewId)
  var removeReview = {
  	markedForDeletion: true,
  }
  $.ajax ({
      method: 'DELETE',
      url: '/api/' + reviewId + '/reviews',
     	data: removeReview,
  })
  .then(function (reviewRemoved) {
  	console.log('This truck has been removed');
    console.log($('[data-review-id =' + reviewId + ']').remove())
    $('[data-review-id =' + reviewId + ']').remove();
  });
};

function writeReviewInputOpen() {
  $('.write-review-information').remove();
  console.log('writeReview is working');
  let foodTruckIdForWriteReview
  foodTruckIdForWriteReview = $(this).closest('.card-truck').attr('data-truck-id');
  console.log('foodTruckIdForWriteReview ID', foodTruckIdForWriteReview)

  let writeReviewHtml = ( `
    <div class="write-review-information" data-write-foodtruck-id='${foodTruckIdForWriteReview}'>
      <div class="row reviews">
        <div class="col s12 review-information-info">
          <input class='input-for-reviews reviews-atmosphere-input' id='input-atmosphere' placeholder="Food Truck Atmosphere"></input>
          <input class='input-for-reviews reviews-value-input' id='input-value' placeholder="Food Truck Value"></input>
          <input class='input-for-reviews reviews-quality-input' id='input-quality' placeholder="Food Truck Quality"></input>
          <input class='input-for-reviews reviews-titleOfReview-input' id='input-titleOfReview' placeholder="Title Of Review"></input>
          <input class='input-for-reviews reviews-content-input' id='input-content' placeholder="Content of Review"></input>
          <input class='input-for-reviews reviews-userName-input' id='input-content' placeholder="Username Here"></input>


            <div class="file-field input-field">
              <div class="btn">
                <span>File</span>
                <input type="file" multiple>
              </div>
              <div class="file-path-wrapper">
                <input class='file-path validate input-for-file' name='image' id='input-review-images' type="text" placeholder="Upload your food images">
              </div>
            </div>
          <button class='btn blue write-truck-review-submit review-buttons'>Submit Review</button>
        </div>
      </div>
    </div>
  `);
  $('#write-review').append(writeReviewHtml)
}

function writeReviewSubmit () {
  console.log('writeReviewSubmit is working');
  let foodTruckIdForWhenSubmittingReview
  foodTruckIdForWhenSubmittingReview = $(this).closest('.write-review-information').attr('data-write-foodtruck-id');

  console.log('foodTruckIdForWhenSubmittingReview ID', foodTruckIdForWhenSubmittingReview)
  let writeReviewAtmosphere = $('.reviews-atmosphere-input').val();
  let writeReviewValue = $('.reviews-value-input').val();
  let writeReviewQuality = $('.reviews-quality-input').val();
  let writeReviewTitleOfReview = $('.reviews-titleOfReview-input').val();
  let writeReviewContent = $('.reviews-content-input').val();
  let writeReviewUserName = $('.reviews-userName-input').val();

// need to fix the way to parse images
  let writeReviewImages = [];
  // remove the spaces first
  let writeReviewImagesUploaded = $('.input-for-file').val().replace(/\s/g, '').split(',');

  let filePath = '/images/food_truck/reviews/';
  for ( let i = 0; i < writeReviewImagesUploaded.length; i++) {
    writeReviewImages.push(filePath.concat(writeReviewImagesUploaded[i]));
  };
  console.log(writeReviewImagesUploaded)


  let writeReviewData = {
    atmosphere: writeReviewAtmosphere,
    value: writeReviewValue,
    quality: writeReviewQuality,
    titleOfReview: writeReviewTitleOfReview,
    content: writeReviewContent,
    userName: writeReviewUserName,
    image: writeReviewImages,
    foodTruck: foodTruckIdForWhenSubmittingReview,
  };
  $.ajax ({
      method: 'POST',
      url: '/api/' + foodTruckIdForWhenSubmittingReview + '/reviews',
     	data: writeReviewData,
  })
  .then(function (createdReview) {
    $('.write-review-information').remove();
    renderReview(createdReview)
  	console.log('This is the new review that was created ', writeReviewData);
  });
};
