// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

var truck_list = [
  {
    name: 'Curry Up Now',
    image: ['/images/food_truck/curryupnow.png'],
    logo: `/images/food_truck/curryupnowlogo.jpeg`,
    aboutTruck: `Think tikka masala burritos, deconstructed samosas and sexy fries. We take traditional Indian flavors and present them in a friendly, recognizable way. Our obsession is amazing tasting food, but we’re just as passionate about making sure our guests have an incredible experience the moment they walk through our doors or step in line at our food trucks.`,
    phoneNumber: '628-777-2276',
    address: `225 Bush Street, San Francisco, CA 94104`,
    lat: 37.790841,
    long: -122.401280,
    review: '',
    typesOfFood:['Indian'],
    dollarValue:'1',
    markedForDeletion: false,
  },
  {
    name: 'El Norteno Taco Truck',
    image: ['/images/food_truck/elnortenotaco.png'],
    logo: '/images/food_truck/elnlogo.png',
    aboutTruck: `Welcome to El Norteno Taco Truck!`,
    phoneNumber: '415-756-1220',
    address: `801 Bryant St, San Francisco, CA 94103`,
    lat: 37.775491,
    long: -122.402425,
    review: '',
    typesOfFood:['Mexican'],
    dollarValue:'2',
    markedForDeletion: false,
  },
  {
    name: `Senor Sisig`,
    image: ['/images/food_truck/senorsisig.jpg'],
    logo: '/images/food_truck/senorsisiglogo.png',
    aboutTruck: `Señor Sisig is a Filipino Fusion Food Truck located in the San Francisco Bay Area.`,
    phoneNumber: '1-855-SISIG-55',
    address: `300 Pine, San Francisco, CA 94104`,
    lat: 37.792268,
    long: -122.401255,
    review: '',
    typesOfFood:['Filipino'],
    dollarValue:'3',
    markedForDeletion: false,
  },
];

var review_list = [
  {
    userName: `Donna`,
    image: ['/images/reviews/curryup0.jpg','/images/reviews/curryup1.jpg'],
    foodTruck: 'Curry Up Now',
    titleOfReview: `Curry... Food Truck... <3`,
    content: `Came here because I love curry, food trucks, and after seeing the good reviews.

    Food: I got the vegan bowl which was filled with a samosa, garbanzo beans, rice, and some pico. Not the best presentation and it was mainly rice. For $10 I thought it would be a lot more food. Flavors were good, on the spicy side which I don't mind.

    Service: There was no line so I got my food super fast.

    Probably won't come back because for the price it's not really worth it. Wasn't bad food, but I've had better curry for sure.`,
    date: '',
    atmosphere: 4,
    value: 4,
    quality: 5,
    markedForDeletion: false,
  },
  {
    userName: `Rice Krispies`,
    image: ['/images/reviews/curryup2.jpg','/images/reviews/curryup3.jpg'],
    foodTruck: 'Curry Up Now',
    titleOfReview: `Little bit of spice a whole lotta nice`,
    content: `If you know what a samosa is, than expect your tastebuds to never return to a typical samosa after you try Curry Up Now's "Deconstructed Samosa." This $8 treat (+$1 to make it a rice bowl) is claimed an inside-out phenomenon! And I can vouch for this flavor blasting bowl of goodness.

    What you're receive: Chana masala (a spicy Indian chickpea dish that I absolutely love and am still trying to perfect at home--send me all your favorite recipes!), pico de gallo with chutneys dressed with mini samosas that include your choice of protein: beef, chicken, paneer or vegan option.

    It's spicy, well balanced on the flavor, and will keep your eating until there's none left. The portion is large, this is definitely one meals worth of food or a great dish to split among several people.`,
    date: '',
    atmosphere: 4,
    value: 5,
    quality: 5,
    markedForDeletion: false,
  },
  {
    userName: `Taco Lover`,
    image: ['/images/reviews/elnor0.jpg','/images/reviews/elnor1.jpg'],
    foodTruck: `El Norteno Taco Truck`,
    titleOfReview: `Tacos for days`,
    content: `Damn, that's one delicious taco. And there goes the second one down my tummy. And where's the third? Why didn't I order a third taco?!

    I came at around noontime. There was a small line but it goes by quickly. Placed my order for 2 super tacos - one carnitas and one carne asada, both mild. It came out to be $6.75 for both. In less than ten minutes, I got my tacos and was able to head back to the office. There's no tables for you to eat on so you would have to be creative and find some steps or sidewalk seating.

    I was happy to open up my box and see that it came with a side of rice and beans. Tacos had a good heaping of sour cream and guacamole (my two favorite things). The outer tortilla of the taco was so amazingly crispy! Both the carnitas and carne asada were solid picks. Definitely would come back again soon for more tacos regardless if it's Taco Tuesday or not!`,
    date: '',
    atmosphere: 3,
    value: 5,
    quality: 5,
    markedForDeletion: false,
  },
  {
    userName: `Diana`,
    image: ['/images/reviews/ssburrito.jpg','/images/reviews/sstaco.jpg'],
    foodTruck: `Senor Sisig`,
    titleOfReview: 'Authentic Food',
    content: 'This place was is one of the best taco places I have ever eaten at on weels.The people are so nice and the food tast amazing. I will definetly come here again',
    date: '',
    atmosphere: 4,
    value: 5,
    quality: 4,
    markedForDeletion: false,
  },
  {
    userName: `Jessie`,
    image: ['/images/reviews/ss0.jpg','/images/reviews/sscalifries.jpg'],
    foodTruck: `Senor Sisig`,
    titleOfReview: 'Nice people',
    content: 'The people give you a big portion and the right bang for your buck',
    date: '',
    atmosphere: 4,
    value: 4,
    quality: 4,
    markedForDeletion: false,
  },
  {
    userName: `Stacy`,
    image: ['/images/reviews/ss1.jpg','/images/reviews/ss2.jpg'],
    foodTruck: `Senor Sisig`,
    titleOfReview: 'GREAT FOOOOD!!!',
    content: 'The food makes my tummy happy',
    date: '',
    atmosphere: 5,
    value: 3,
    quality: 5,
    markedForDeletion: false,
  },
];


db.Truck.remove({}, function(err, reviews) {
  console.log('removed all truck');
  db.Truck.create(truck_list, function(err, trucks){
    if ('SAVE truck', err) { // not sure if this is a valid conditional; probably never runs, even if there is an error
      console.log(err);
      return;
    }
    console.log('recreated all trucks');
    console.log("created", trucks.length, "trucks");
    db.Review.remove({}, function(err, reviews){
      console.log('removed all reviews');
      review_list.forEach(function (reviewData) {
        var review = new db.Review({
          userName: reviewData.userName,
          image: reviewData.image,
          titleOfReview: reviewData.titleOfReview,
          content: reviewData.content,
          atmosphere: reviewData.atmosphere,
          value: reviewData.value,
          quality: reviewData.quality,
          markedForDeletion: reviewData.markedForDeletion,
        });
        db.Truck.findOne({name: reviewData.foodTruck}, function (err, foundTruck) {
          console.log('found truck ' + foundTruck.name + ' with review written by ' + review.userName);
          if (err) {
            console.log('findOne Error!', err);
            return;
          }
          // Doesn't matter as much as something like the seed file, which you may or may not expand on,
          // but it's good to not use comments and instead group code into appropriately named functions
          // so your code stays readable
          // e.g. setTruckForEachReview()
          review.foodTruck = foundTruck;
          review.save(function(err, savedReview){
            if ('SAVED REVIEW ERR', err) {
              return console.log(err);
            }
            console.log('saved review by' + savedReview.userName + ' for ' + foundTruck.name);
          });
        });
      });
    });
  });
});