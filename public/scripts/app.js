console.log('app.js is still linked')

  var map;

function initMap() {
    var defaultMapPosition = {lat: 37.774929, lng: -122.419416};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: defaultMapPosition, 
      styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
    });
  }
$(document).ready(function(){


  $('.scrollspy').scrollSpy();
  // //initialize all modals
  $('.modal').modal();

  $.ajax({
    method: 'GET',
    url: '/api/foodtruckresults',
    success: renderAllTrucks
  });
  //initMap();

  

  $(document).on("click", ".modal-triggers", editTruck);

  $(document).on("click", ".save-truck-edit", saveTruck);

  $(document).on('click', '.delete-truck', removeTruck);

  $(document).on('click', '.read-truck-reviews', renderAllReview);

  $(document).on('click', '.delete-review', deleteReview);

  $(document).on('click', '.write-truck-review', writeReviewInputOpen);

  $(document).on('click', '.write-truck-review-submit', writeReviewSubmit);

  $(document).on('click', '.delete-review', function () {
    prompt('What is you reason for deleting this?')
  })



  $('#overlay-for-reviews').on('click', function() {
    $('#overlay-for-reviews').hide();
    $('body').removeClass('myCSS')
  });

  function renderAllTrucks (trucks) {
    trucks.forEach(function (truck) {
      //renderAllTrucks log 
      renderTruck(truck);
    });
  }
  // create new truck
  function saveTruck(e) {
    e.preventDefault();
    $('#modal1').modal('close');
    var saveData = $('#edit-truck-form').serialize();
    var truckId = $('#edit-truck-form').find('.truck-id').val();
    //THIS IS TRUCK ID FROM saveTruck function ', truckId
    $.ajax({
      method: 'PUT',
      url: '/api/' + truckId,
      data: saveData,
    })
    .then(function(savedTruckData) {
      // document.location.href="/";
      //SAVED DATA IS HERE', savedTruckData
      $('[data-truck-id =' + truckId + ']').remove();
      renderTruck(savedTruckData);
      $('[data-truck-id =' + truckId + ']')[0].scrollIntoView();
    });
  }
  function editTruck() {
    $("#modal1").modal("open");
    var truckJson = JSON.parse($(this).attr("data-truck"));
    //STRINGIFY THE NAME HERE', truckJson.name
    inputValidate();
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
    <input type="number" min="1" max="5" value='${truckJson.dollarValue}' name='dollarValue' placeholder="Average dollar value 1-5" id="truck_prices" type="number" class="validate" id='validate_num'>
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
    let dollarValue = buildDollar(truck.dollarValue || 1);
    var trucksHTML = (`

     
     <div class="col s4 card-truck" data-truck-id="${truck._id}">
      <div class="card medium z-depth-5">
            <div class="card-image waves-effect waves-block waves-light" >
              <img  class="activator" class='col s4' src="${truck.logo}">

            </div>
            <div class="card-content ">Type of food
            <span class="card-title activator white-text text-darken-4">${truck.typesOfFood}<i class="material-icons right"></i></span>
              <p>Average Price: ${dollarValue}</p>

            </div>
            <div class="card-reveal">
              <span id='setimg' class="card-title grey-text text-darken-4">${truck.address}<i class="material-icons right">${truck.phoneNumber}</i></span>
              <img class="activator reveal-size"  src="${truck.image}">
              <p>${truck.aboutTruck}</p>
            </div>
              <div class='card-footer'  >

        <!-- Modal Trigger -->
              <a class="waves-effect waves-light fourbut btn  modal-triggers" data-truck='${JSON.stringify(truck)}'>Edit Truck</a>
              <a class='waves-effect waves-light fourbut btn  delete-truck'>Delete Truck</a>
              <a class='waves-effect waves-light fourbut btn  read-truck-reviews review-buttons'>Read Reviews</a>
              <a href="#formscroll" class='waves-effect waves-light fourbut btn  write-truck-review write-review-buttons'>Write Review</a>

      </div>
      </div>
      </div>`);
      $('#trucks').prepend(trucksHTML)
      addMapMarkers(truck.lat, truck.long, truck.name)
     //THIS IS RENDER TRUCK HTML , truck
     //THIS IS RENDER TRUCK LAT, truck.lat
     //THIS IS RENDER TRUCK LONG , truck.long
    };
    function addMapMarkers(lat, long, name) {
      //THIS IS addMapMarkers LAT ', lat
      //THIS IS addMapMarkers LONG ', long
      var marker = new google.maps.Marker({
        position: {
          lat: lat,
          lng: long,
        },
        map: map, 
        title: name,
        icon: '../images/food_truck/ft-icon.png',
      });
    }
    // end of document.ready
  });
  var trucksHTMLForm = function (truckData) { `
    `}
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
       //This truck has been removed, truckRemoved
        truckId.remove()
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
          //This truck has been removed
          truck.remove()
        });
      }
      function renderAllReview (reviews) {
        $('.write-review-information').remove();
      //read reviews button is working
        let currentTruckId
        currentTruckId = $(this).closest('.card-truck').attr('data-truck-id');
        $.ajax({
          method: 'GET',
          url: '/api/' + currentTruckId + '/reviews'
        })
        .then(function(currentProfileData) {
          $('.review-information').fadeOut(300, function() {
            $(this).remove();
          });
          //This is the renderAllReview data coming back
          currentProfileData.forEach(function (review) {
            renderReview(review);
          });
        })
        .catch(function(err) {
         //renderAllReview failed ', err
        });
      }
      // render one review
      function renderReview(review) {
       //Rendering one single review', review
        let atmosphereStars = buildStars(review.atmosphere);
          let valueStars = buildStars(review.value);
            let qualityStars = buildStars(review.quality);
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
          <span class='reviews-atmosphere reviews' name='atmosphere' value=''>atmosphere: ${atmosphereStars}</span>
          </div>
          <div>
          <span class='reviews-value reviews' name='value' value=''>value: ${valueStars}</span>
          </div>
          <div>
          <span class='reviews-quality reviews' name='quality' value=''>quality: ${qualityStars}</span>
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
          //deleteReview is working
          let reviewId
          reviewId = $(this).closest('.review-information').attr('data-review-id');
          //deleteReview ID', reviewId
          var removeReview = {
            markedForDeletion: true,
          }
          $.ajax ({
            method: 'DELETE',
            url: '/api/' + reviewId + '/reviews',
            data: removeReview,
          })
          .then(function (reviewRemoved) {
            //This truck has been removed'
            $('[data-review-id =' + reviewId + ']').remove();
          });
        };

        function writeReviewInputOpen() {
          $('.write-review-information').remove();
          $('.review-information').remove();
          //writeReview is working
          let foodTruckIdForWriteReview
          foodTruckIdForWriteReview = $(this).closest('.card-truck').attr('data-truck-id');
          // this is getting the entire object info (JSON info from the modal) which is where we sent it during the creation of the modal
          // you use siblings b/c the a node is on the same node as the 'write review button' which is the this
          var truckJson = JSON.parse($(this).siblings('.modal-triggers').attr("data-truck"));
          //THIS IS THE ENTIRE JSON OBJECT THAT LIVES IN THE MODAL
          let writeReviewHtml = ( `
            <div id='write-review-scrollspy' class='section scrollspy write-review-information' data-write-foodtruck-id='${foodTruckIdForWriteReview}'>
            <div class="row write-reivew">
            <div class="col s3 write-reivew-sides"></div>
            <div class="col s6 write-review-information-info">
            <h4 id='formscroll' class='review-header-name'>Write a reivew for ${truckJson.name}</hr4>
            <form>
            <input type="number" min="1" max="5" class='input-for-reviews reviews-atmosphere-input' id='input-atmosphere' placeholder="Food Truck Atmosphere (1 - 5)"></input>
            <input type="number" min="1" max="5" class='input-for-reviews reviews-value-input' id='input-value' placeholder="Food Truck Value (1 - 5)"></input>
            <input type="number" min="1" max="5" class='input-for-reviews reviews-quality-input' id='input-quality' placeholder="Food Truck Quality (1 - 5)"></input>
            <input class='input-for-reviews reviews-titleOfReview-input' id='input-titleOfReview' placeholder="Title Of Review"></input>
            <input class='input-for-reviews reviews-content-input' id='input-content' placeholder="Content of Review"></input>
            <input class='input-for-reviews reviews-userName-input' id='input-content' placeholder="Username Here"></input>
            <div class="file-field input-field">
            <div class="btn rev-file">
            <span>File</span>
            <input type="file" multiple>
            </div>
            <div class="file-path-wrapper">
            <input class='file-path validate input-for-file' name='image' id='input-review-images' type="text" placeholder="Upload your food images">
            </div>
            </div>
            <button class='btn  write-truck-review-submit review-buttons'>Submit Review</button>
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
            //writeReviewSubmit is working
            let foodTruckIdForWhenSubmittingReview
            foodTruckIdForWhenSubmittingReview = $(this).closest('.write-review-information').attr('data-write-foodtruck-id');
            //foodTruckIdForWhenSubmittingReview ID', foodTruckIdForWhenSubmittingReview
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
              //This is the new review that was created 
            });
            // RUNNING THE MAP
          };
function inputValidate () {
   let num = $('#validate_num').val()
   var max = 5
   var min = 1
   if ((num) > max)
   {
      (num).val(max);
      // prompt('value must be less than 5')
   }
   else if ((num) < min)
   {
      (num).val(min);
   }       
};
//Switches rating number to visual star display
function buildStars (num) {
  if (!num || num <= 1) {
    return '&#9733;'
  } else {
    return ('&#9733;' + buildStars(num -1));
  }
}
//Switches rating number to visual dollar display
function buildDollar (num) {
  if (!num || num <= 1) {
    return '&#36;'
  } else {
    return ('&#36;' + buildDollar(num -1));
  }
}