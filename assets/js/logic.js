
// add ready function??

$(document).ready(function() {

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


	// ==================GOOGLE API CALL & Print Default Map to screen=====================

	var Key = 'AIzaSyAxNtwAwM8tjrDJJQQSHfJzgepd1YI54_E';

	// Google API to get lat/lng or place_id
	queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=+Austin,+TX&key='+Key;

	$.ajax({

		url: queryURL,
		method: 'GET'
		
		}).done(function(json) {
				// Do we need to grab to lat long and put them in the data base?
				console.log(json);

				// console.log(json.results[0].place_id);
				var placeID = json.results[0].place_id;
				console.log(placeID);

				// console.log(json.results[0].geometry.location.lat);
				var placeLat = json.results[0].geometry.location.lat;
				console.log(placeLat);
				
				// console.log(json.results[0].geometry.location.lng);
				var placeLng = json.results[0].geometry.location.lng;
				console.log(placeLng);
				
				// This is printing to the screen but should be out of this function
				$("#map2").append('<iframe src=https://www.google.com/maps/embed/v1/place?key='+Key+'&q=big+bend+tx width="800" height="600" frameborder="0" style="border:0" ></iframe>');
				
		});



	// database.ref('day_trip/').push(dayTrip)/*Is this correct*/

	// https:www.google.com/maps/embed/v1/place?key=AIzaSyAxNtwAwM8tjrDJJQQSHfJzgepd1YI54_E&q=austin+tx

// retreive city input from user
// ===================================================
$('#addLocation').on('click', function(){

		// Here we grab the text from the input box 
		var city = $('#location-input').val().trim();

		// Here we assemble our URL 
		var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=29ce5f4e343c631c7edc5ddd5dbeec3f";


		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			// Retrieves the Location Weather Data
			var currentWeather = response.main.weather;

			$('#LocationWeatherView').append(currentWeather);
	})
		return false;
});
// ====================================================




// ================END GOOGLE API CALL=====================


//});/*End of on click funtion*/ 



// =================Printing Map To Screen=================

//=================George Testing Data Base Configuration=======================

var newTrip = {

	
}
// all these vars are for testing only. We will grab them dynamically in two other functions.
// after we pus them to the DB, make a reset to clear the vars and leave them empty. 
var testing1 = ['testin','to','see','what','an','array','looks','like'];
var testing2 = ['motel6', 'under a tree', 'in a car', 'on the street'];
var testing3 = ['Congress Street Bridge', 'capitol', 'ski shores', 'yellow rose'];
var testing4 = "lat 30.99999";
var testing5 = "lng -90.84848";
var name = "User Name George";
var email = "User data5testing2";
var cityState = "austin, tx";
var cityState2 = "houston, tx";
var trip = "day";



//This is creating one "parent" in the data base named "trips"
var trips = database.ref("trips");

// This fuction will be called when a NEW trip is created the very first time, and only the 1st time
// it will push the city, type of trip, and info to put Google maps on the screen.
function newTrip(){

// 1st thing that happens is grabing the values from the screen and creating vars. 
// var city = input.val().trim();
// var type = input.val().trim();

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
	var key = trips.push({

				eat: [],
				sleep: [],
				see: [],
				lat: "some lat number",
				lng: 'some lng number',
				id: "temp for placeID",
				city: "Austin, TX",
				city2: "houston, TX",
				notes: ""
				
				}).key;

	console.log(key);
	trips.on("value", function(snapshot) {
		console.log(snapshot.val()[key]);
	});

// dynamically put the key in the dom, so we can use it again for the updateTrip function
 // var $key = "<p>" + key + "</p>";
 //    $("#need ID").html($key);
// Be sure you empty vars from top of fuction??

};/*end of newTrip function*/

// Firing the newTrip funct will be embedded in an onlick from a specific screen and button.
newTrip();

function updateTrip(){

// Need to grap the key dynamically and insert it in the next line for key, and as a key value pair.
// var key = grab the number dynamically from the dom.
var newData = {};
newData['/trips/'+key]= {
								eat: testing1,
								sleep: testing2,
								see: testing3,
								lat: testing4,
								lng: testing5,
								city: cityState,
								city2: cityState,
								trip:trip,
								key: key
							};

database.ref().update(newData);
};/*end of update function*/
// updateTrip();

// weekend_trip.update({
// 	user:name,
// 	contact:email
// 	});

// week_trip.update({
// 	user:name,
// 	contact:email
// 	});

// day_trip.update({
// 		austin:{Can we make the name of this child when a user selects a city or place?
// 				eat:testing1,
// 				sleep:testing2,
// 				see:testing3,
// 				lat:testing4,
// 				lng:testing5,
// 				city: cityState
// 		}
// 	});

// This also works
// var austinchild = day_trip.child("austin");
// austinchild.update({
//   	lat:testing4,
// 	lng:testing5
// });

// day_trip.update({
// 		houston:{/*Can we make the name of this child when a user selects a city or place?*/
// 				eat:testing1,
// 				sleep:testing2,
// 				see:testing3,
// 				lat:testing4,
// 				lng:testing5,
// 				city: cityState2

// 		}
// 	});

// weekend_trip.update({
// 		trip001:{Can we make the name of this child when a user selects a city or place?
// 				eat:testing1,
// 				sleep:testing2,
// 				see:testing3,
// 				lat:testing4,
// 				lng:testing5

// 		}
// 	});

// week_trip.update({
// 		trip001:{/*Can we make the name of this child when a user selects a city or place?*/
// 				eat:testing1,
// 				sleep:testing2,
// 				see:testing3,
// 				lat:testing4,
// 				lng:testing5

// 		}
// 	});

// At the initial load, get a snapshot of the current data.
trips.on("value", function(snapshot) {

	// var seeS = snapshot.val().key.see; 

	// Print the initial data to the console.
	// console.log(snapshot.val()[key].city);
	// console.log(snapshot.val().houston);
	console.log(snapshot.val());
	// console.log(JSON.stringify(seeS));
	// console.log(snapshot.val().austin.sleep);
	// console.log(snapshot.val().austin.sleep.length);
	// console.log(snapshot.val().austin.city);
	// console.log(snapshot.val().houston.city);
});

trips.limitToLast(20).on("child_added", function(snap) {
  // can we do a limit to all children?
  	console.log(snap.val().city);
  	// console.log(snap.val().city2);
});
	


// Why wont' this work!! I want to order by child damnit!!
// var ref = new Firebase('https://tripmaker-adbb4.firebaseio.com');
// ref.orderByChild("city").on("child_added", function(snapshot) {
//   console.log(snapshot.key() + "line 196" + snapshot.val().city);
// });




//==================END of George Testing Data Base Configuration===============


//=========================================================
// $("#").on("click", function(){

// 	// Get data from input fields
// 	var where =
// 	var toDo1 =
// 	var toDo2 = 
// 	var toDo3 = 
// 	var toDo4 =
// 	var toDo5 =
// 	var eatDrink1 = 
// 	var eatDrink2 = 
// 	var eatDrink3 =
// 	var eatDrink4 = 
// 	var distance = ?
// 	var idealMonth = ?
// 	var temp = ?
// 	var contactName = ?


//  var dayTrip = {
//  	// I'm guessing at these for now, just getting the code right
//  	destination: where

//  	to_do_1: toDo1
//  	to_do_2: toDo2
//  	to_do_3: toDo3
//  	to_do_4: toDo4
//  	to_do_5: toDo5

//  	to_consume1: eatDrink1
//  	to_consume2: eatDrink2
//  	to_consume3: eatDrink3
//  	to_consume4: eatDrink4

//  	travel_distance: distance

//  	ideal_month: idealMonth

//  	current_temp: temp

//  	contact_name: contactName


//  	/*TIMESTAMP*/

//  	};/*end of dayTrip json object*/

// 	database.ref('/day_trip').push(dayTrip)/*Is this correct, does that forward slash need to be there?*/

 	// return false; /*Do I need this?, What was the other method Josh said to use?*/

 //});/*End of on click funtion*/

});/*END OF .ready function*/

