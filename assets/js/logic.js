
// add ready function??

$(document).ready(function() {

	$("#page2").hide();
	$("#page3").hide();
	$("#page1btn").click(function(){
		$("#page1").hide();
		$("#page3").hide();
		$("#page2").show();

	});

	$("#donebtn").click(function(){
		$("#page1").hide();
		$("#page2").hide();
		$("#page3").show();

	});




	// alert("working!");
	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCJc9HSfoAU52BKbniU98Tb4JaiYPCvxkI",
	    authDomain: "tripmaker-adbb4.firebaseapp.com",
	    databaseURL: "https://tripmaker-adbb4.firebaseio.com",
	    storageBucket: "",
	    messagingSenderId: "9591901571"
	  };

	  firebase.initializeApp(config);

	var database = firebase.database();

	// ===Need to either make an on click function to grab the value from the input, or make a button====
	$("#page1btn").on("click", function(){
		var tripType = $('input[name="group1"]:checked').val();
		var userPlace = $('#destination').val().trim();
		newTrip.$type = tripType;
		newTrip.$place =  userPlace;
		newTrip.start_trip();
		
		console.log(newTrip.$place);
		console.log(newTrip.$type);
		


 	});/*End of DAY on click funtion*/

	$("#page1btn2").on("click", function(){
		var tripType = $('input[name="group1"]:checked').val();
		var userPlace = $('#destination').val().trim();
		newTrip.$type = tripType;
		newTrip.$place =  userPlace;
		newTrip.start_trip();

		console.log(newTrip.$place);
		console.log(newTrip.$type);

 	});/*End of WEEKEND on click funtion*/

	$("#page1btn3").on("click", function(){
		var tripType = $('input[name="group1"]:checked').val();
		var userPlace = $('#destination').val().trim();
		newTrip.$type = tripType;
		newTrip.$place =  userPlace;
		newTrip.start_trip();

		console.log(newTrip.$place);
		console.log(newTrip.$type);

 	});/*End of WEEK on click funtion*/

var newTrip = {

	// Grab values from screen and create variables to use in my methods
	$place: "",
	$type: "",
	key: 0, /*Not sure I can get this number in here*/
	$seeDo: [],
	$eatDrink: [],
	$sleep: [],
	$notes: "",
	$lat:0,
	$lng:0,
	$placeID:0,

	// get city and print map to screen, get city and type and print to same page
	// will work on an on click method on first new trip screen
	start_trip: function(){

		$("#destination").html("I want my "+newTrip.$type+" plans to "+newTrip.$place+" to include");

		var googleKey = 'AIzaSyAxNtwAwM8tjrDJJQQSHfJzgepd1YI54_E';
		// Google API to get lat/lng or place_id
		queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+newTrip.$place+"&key="+googleKey;

		$.ajax({
			url: queryURL,
			method: 'GET'
			
			}).done(function(json) {
					// Do we need to grab to lat long and put them in the data base?
					console.log(json);
					// console.log(json.results[0].place_id);
					newTrip.$placeID = json.results[0].place_id;
					console.log(newTrip.$placeID);
					// console.log(json.results[0].geometry.location.lat);
					newTrip.$lat = json.results[0].geometry.location.lat;
					console.log(newTrip.$lat);
					// console.log(json.results[0].geometry.location.lng);
					newTrip.$lng = json.results[0].geometry.location.lng;
					console.log(newTrip.$lng);

					}); /*End of googl ajax call*/
					
					// This is printing to the screen but should be out of this function
					$("#map").append('<iframe width="100%" height="50%" src=https://www.google.com/maps/embed/v1/place?key='
						+googleKey+'&q='+newTrip.$place+'></iframe>');
					

		// ===================Shannon's Weather API call====================================================
		// $('#addLocation').on('click', function(){

		// 		// Here we grab the text from the input box 
		// 		var city = $('#location-input').val().trim();

		// 		// Here we assemble our URL 
		// 		var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=29ce5f4e343c631c7edc5ddd5dbeec3f";


		// 		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

		// 			// Retrieves the Location Weather Data
		// 			var currentWeather = response.main.weather;

		// 			$('#LocationWeatherView').append(currentWeather);
		// 			})
		// 				return false;
		// 		});/*End of on click funtion*/ 
		// ====END ============Shannon's Weather API call====================================================				
		

	}, /*End of start_trip function*/




	// relies on 4 onclicks to add values to the vars above, *need to add to the 3 arrays
	// then the "save trip" on click will push everything to the Database
	push_trip: function(){

		//This is creating one "parent" in the data base named "trips"
		var trips = database.ref("trips")
		trips.push({

				place: $place,
				type: $type,
				key: key,
				see_do:$seeDo,
				eat_drink: $eatDrink,
				sleep: $sleep,
				notes: $notes,
				lat: $lat,
				lng: $lng,
				place_ID: $placeID
				}).key;

		// empty the local keys after the push to the database
		newTrip.empty();
	},

	// clear the keys so they don't screw up the next new trip
	empty: function(){

		newTrip.$place = "";
		newTrip.$type = "";
		newTrip.key = 0; /*Not sure I can get this number in here*/
		newTrip.$seeDo = [];
		newTrip.$eatDrink = [];
		newTrip.$sleep = [];
		newTrip.$notes = "";
		newTrip.lat = 0;
		newTrip.lng = 0;
		newTrip.place_ID = 0;

	}
	
};/*End of newTrip OBJECT*/

// ================this can be deleted once we have it writing to the database==============
// var testing1 = ['testin','to','see','what','an','array','looks','like'];
// var testing2 = ['motel6', 'under a tree', 'in a car', 'on the street'];
// var testing3 = ['Congress Street Bridge', 'capitol', 'ski shores', 'yellow rose'];
// var testing4 = "lat 30.99999";
// var testing5 = "lng -90.84848";
// var name = "User Name George";
// var email = "User data5testing2";
// var cityState = "austin, tx";
// var cityState2 = "houston, tx";
// var trip = "day":


// 2nd - is getting the city var and putting it through Google geocode to get lat/lng+jplaceID.
// and printing a map to the screen.
// Put Google ajax call to geocode API code here++++++++++++++++++++++++++++
// var lat = json.results[0].geometry.location.lat;
// 	console.log(lat);
// var lng = json.results[0].geometry.location.lng;
// 	console.log(lng);
// var placeID = json.results[0].place_id;
// 	console.log(placeID);

// Put code to print to screen here+++++++++++++++++++++++++++

// Weather API, ajax call and print to screen.

// 3rd create a new child when we push the city and trip type to the DB, setting up the other key value
// pairs as empty
									// var key = trips.push({

									// 			eat: [],
									// 			sleep: [],
									// 			see: [],
									// 			lat: "some lat number",
									// 			lng: 'some lng number',
									// 			id: "temp for placeID",
									// 			city: "Austin, TX",
									// 			city2: "houston, TX",
									// 			notes: ""
												
									// 			}).key;

									// console.log(key);
									// trips.on("value", function(snapshot) {
									// 	console.log(snapshot.val()[key]);
									// });

// dynamically put the key in the dom, so we can use it again for the updateTrip function
 // var $key = "<p>" + key + "</p>";
 //    $("#need ID").html($key);
// Be sure you empty vars from top of fuction??


// Firing the newTrip funct will be embedded in an onlick from a specific screen and button.

									// function updateTrip(){

									// // Need to grap the key dynamically and insert it in the next line for key, and as a key value pair.
									// // var key = grab the number dynamically from the dom.
									// var newData = {};
									// newData['/trips/'+key]= {
									// 								eat: testing1,
									// 								sleep: testing2,
									// 								see: testing3,
									// 								lat: testing4,
									// 								lng: testing5,
									// 								city: cityState,
									// 								city2: cityState,
									// 								trip:trip,
									// 								key: key
									// 							};

									// database.ref().update(newData);
									// };/*end of update function*/



// // At the initial load, get a snapshot of the current data.
// trips.on("value", function(snapshot) {

// 	// var seeS = snapshot.val().key.see; 

// 	// Print the initial data to the console.
// 	// console.log(snapshot.val()[key].city);
// 	// console.log(snapshot.val().houston);
// 	console.log(snapshot.val());
// 	// console.log(JSON.stringify(seeS));
// 	// console.log(snapshot.val().austin.sleep);
// 	// console.log(snapshot.val().austin.sleep.length);
// 	// console.log(snapshot.val().austin.city);
// 	// console.log(snapshot.val().houston.city);
// });

// trips.limitToLast(20).on("child_added", function(snap) {
//   // can we do a limit to all children?
//   	console.log(snap.val().city);
//   	// console.log(snap.val().city2);
// });



});/*END OF .ready function*/



