console.log('app.js is still linked')
$(document).ready(function(){
 $('.scrollspy').scrollSpy();
  $('.parallax').parallax();
  // //initialize all modals
  //  $('.modal').modal();
   $('.modal').modal();


   $('input').on('keypress', function (event) {
       var regex = new RegExp("^[a-zA-Z0-9]+");
       var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
       if (!regex.test(key)) {
          event.preventDefault();
          return false;
       }
   });


  $.ajax({
    method: 'GET',
    url: '/api/foodtruckresults',
    success: renderAllTrucks
  });


  function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    console.log('MAP')
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
  initMap();



$(document).on("click", ".save-truck-edit", function () {
  $('.modal').modal();
});

$(document).on("click", ".modal-triggers", editTruck);

$(document).on("click", ".save-truck-edit", SaveTruck);

$(document).on('click', '.delete-truck', removeTruck);

$(document).on('click', '.read-truck-reviews', renderAllReview);

$(document).on('click', '.delete-review', deleteReview);

$(document).on('click', '.write-truck-review', writeReviewInputOpen);

$(document).on('click', '.write-truck-review-submit', writeReviewSubmit);

$('#overlay-for-reviews').on('click', function() {
  $('#overlay-for-reviews').hide();
  $('body').removeClass('myCSS')
});

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
    <form id="form" class="col s12" method="POST" action="/api/:truckId" encType="multipart/form-data">
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
        </div>
    </div>
    <button class='btn btn-info black save-truck-edit' type="submit" >Submit</button>
  </form>
</div>
</section>
	`;

	$("#edit-truck-form").html(editTruckHtml);

	// Step 1: Take JSON and create form fields with it
	// Step 2: Replace HTML of modal body with newly-created form fields

}


// Rendering the truck data
function renderTruck(truck) {
  // we are also stringify the entire JSON object of the truck to store it in the modal making it easy to get it back in the beginning
var trucksHTML = (`

	 	 <div class="col s4 ">
	 	  <div class="card medium card-truck z-depth-5" data-truck-id="${truck._id}" >
            <div class="card-image waves-effect waves-block waves-light" >
              <img  class="activator" class='col s4' src="${truck.logo}">

            </div>
            <div class="card-content ">Type of food
            <span class="card-title activator white-text text-darken-4">${truck.typesOfFood}<i class="material-icons right"></i></span>
              <p>Average Price: <a href="#">${truck.dollarValue}$</a></p>

            </div>
            <div class="card-reveal">
              <span id='setimg' class="card-title grey-text text-darken-4">${truck.address}<i class="material-icons right">${truck.phoneNumber}</i></span>
              <img class="activator"  src="${truck.image}">
              <p>${truck.aboutTruck}</p>
            </div>
              <div class='card-footer'  >

				<!-- Modal Trigger -->
  				    <a class="waves-effect waves-light fourbut btn  modal-triggers" data-truck='${JSON.stringify(truck)}'>Edit Truck</a>
              <a class='waves-effect waves-light fourbut btn  delete-truck'>Delete Truck</a>
              <a class='waves-effect waves-light fourbut btn  read-truck-reviews review-buttons'>Read Reviews</a>
              <a class='waves-effect waves-light fourbut btn  write-truck-review write-review-buttons'>Write Review</a>

            </div>
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
};



var trucksHTMLForm = function (truckData) { `
  `}
// using the truck Id to remove on the correct slected truck
function removeTruck () {
  var truck = $(this).closest('.card-truck');
  var truckId = truck.data('truck-id')
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
  $('.write-review-information').remove();
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
  let imgHTML = review.image.map(x => `
    <div class="col s6 review-image-div">
    <img class='responsive-img review-image-src' src='${x}'/>
    </div>

    `
    ).join('');

  let titleHTML = (
    `
    <div class="review-information write-review-title">
      <h2 class='reviews' name='reviews' value=''>Review for ${review.foodTruck.name}</h2>
    </div>
    `
  )
  $('#read-review-title').html(titleHTML)

var reviewHTML = (`
    <div class="review-information" data-review-id='${review._id}'>
      <div class="row reviews">
      <div class="col s1 review-sides"></div>
        <div class="col s10 review-information-info">
          <div>
          <div>
            <span class='reviews-userName reviews' name='userName' value=''>${review.userName}'s Review: ${review.titleOfReview}</span>
          </div>
            <div>
            <br>
              <span class='reviews-atmosphere reviews' name='atmosphere' value=''>atmosphere: ${review.atmosphere}</span>
            </div>
            <div>
              <span class='reviews-value reviews' name='value' value=''>value: ${review.value}</span>
            </div>
            <div>
              <span class='reviews-quality reviews' name='quality' value=''>quality: ${review.quality}</span>
            </div>
            <div>
            <br>
              <span class='reviews-content reviews' name='content' value=''> ${review.content}</span>
            </div>
            <div>
              <span class='reviews-image reviews' name='image' value=''>${imgHTML}</span>
            </div>
          </div>
          <div class="col s10">
            <button class='btn btn-danger red delete-review'>Delete Review</button>

          </div>
        </div>
        <div class="col s1 review-sides"></div>

      </div>
    </div>
    `);
  $('#adding-review').append(reviewHTML)

  let closeButtonHtml = (
    `
    <button class='btn delete-review'>Close</button>
    `
  )
  $('#delete-button-div').html(closeButtonHtml)


  $("#overlay-for-reviews").show();
  $('body').addClass('myCSS')



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
  $('.review-information').remove();

  console.log('writeReview is working');
  let foodTruckIdForWriteReview
  foodTruckIdForWriteReview = $(this).closest('.card-truck').attr('data-truck-id');
  console.log('foodTruckIdForWriteReview ID', foodTruckIdForWriteReview)
  // this is getting the entire object info (JSON info from the modal) which is where we sent it during the creation of the modal
    // you use siblings b/c the a node is on the same node as the 'write review button' which is the this

  var truckJson = JSON.parse($(this).siblings('.modal-triggers').attr("data-truck"));

  console.log('THIS IS THE ENTIRE JSON OBJECT THAT LIVES IN THE MODAL', truckJson)

  let writeReviewHtml = ( `
    <div id='write-review-scrollspy' class='section scrollspy write-review-information' data-write-foodtruck-id='${foodTruckIdForWriteReview}'>
      <div class="row write-reivew">
      <div class="col s3 write-reivew-sides"></div>
        <div class="col s6 write-review-information-info">
        <h4 class='review-header-name'>Write a reivew for ${truckJson.name}</hr4>

        <form>
          <input type="number" min="1" max="5" class='input-for-reviews reviews-atmosphere-input' id='input-atmosphere' placeholder="Food Truck Atmosphere (1 - 5)"></input>
          <input type="number" min="1" max="5" class='input-for-reviews reviews-value-input' id='input-value' placeholder="Food Truck Value (1 - 5)"></input>
          <input type="number" min="1" max="5" class='input-for-reviews reviews-quality-input' id='input-quality' placeholder="Food Truck Quality (1 - 5)"></input>
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
          <div class="col s3 write-reivew-sides"></div>
        </div>
        </form>


      </div>
    </div>
  `);
  $('#write-review').append(writeReviewHtml)
  $('.write-review-information')[0].scrollIntoView();
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

// RUNNING THE MAP

4

};
