

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

	// https://www.google.com/maps/embed/v1/place?key=AIzaSyAxNtwAwM8tjrDJJQQSHfJzgepd1YI54_E&q=austin+tx


// ================END GOOGLE API CALL=====================

// =================Printing Map To Screen=================


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

//  	// return false; /*Do I need this?, What was the other method Josh said to use?*/

// });/*End of on click funtion*/


});/*END OF .ready function*/
