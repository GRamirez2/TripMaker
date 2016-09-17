// add ready function??

alert("working!");
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
  // =======================================================
$("#").on("click", function(){

	// Get data from input fields
	var where =
	var toDo1 =
	var toDo2 = 
	var toDo3 = 
	var toDo4 =
	var toDo5 =
	var eatDrink1 = 
	var eatDrink2 = 
	var eatDrink3 =
	var eatDrink4 = 
	var distance = ?
	var idealMonth = ?
	var temp = ?
	var contactName = ?


 var dayTrip = {
 	// I'm guessing at these for now, just getting the code right
 	destination: where

 	to_do_1: toDo1
 	to_do_2: toDo2
 	to_do_3: toDo3
 	to_do_4: toDo4
 	to_do_5: toDo5

 	to_consume1: eatDrink1
 	to_consume2: eatDrink2
 	to_consume3: eatDrink3
 	to_consume4: eatDrink4

 	travel_distance: distance

 	ideal_month: idealMonth

 	current_temp: temp

 	contact_name: contactName


 	/*TIMESTAMP*/

 	};/*end of dayTrip json object*/

	database.ref('day_trip/').push(dayTrip)/*Is this correct*/

 	// return false; /*Do I need this?, What was the other method Josh said to use?*/

});/*End of on click funtion*/