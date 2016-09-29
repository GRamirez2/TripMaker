var newTrip = (function() {

 

	
	firstHide()
	$("#page1btn").click(function(){
		hideAll();
		$("#page2").show();

		
	});

	 $("#seeTripbtn").click(function(event){
		event.preventDefault();
	 	hideAll();
	 	$("#page3").show();
		getData();



   });

 $("#createBtn").click(function(event){
		event.preventDefault();
	 	hideAll();
	 	$("#page1").show();
	 	


   });

  $("#logo").click(function(event){
		event.preventDefault();
	 	hideAll();
	 	$("#page1").show();
	 	


   });

  	function firstHide(){
  		$("#page2").hide();
		$("#page3").hide();
		$("#page4").hide();
  	};

	function hideAll(){
		$('#page1').hide();
		$('#page2').hide();
		$('#page3').hide();
		$('#page4').hide();
	};




	
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
  var trips = database.ref("trips")


  // ===on click function to grab the value from the input====
  $("#page1btn").on("click", function(){
    
    var userPlace = $('#destination').val().trim();
    var tripType = $("input[name=tripType]:checked").val();/*fix this*/
    $type = tripType;
    $place =  userPlace;
    start_trip();
    
    console.log($place);
    console.log($type);

	});/*End of DAY on click function*/
  //   //===================THESE FUNCTIONS CAN BE DELETED================== 

  // $("#page1btn2").on("click", function(){
  //   var tripType = $('#page1btn2').val().trim();
  //   var userPlace = $('#icon_prefix2').val().trim();
  //   $type = tripType;
  //   $place =  userPlace;
  //   start_trip();

  //   console.log($place);
  //   console.log($type);

  // });/*End of WEEKEND on click funtion*/

  // $("#page1btn3").on("click", function(){
  //   var tripType = $('#page1btn3').val().trim();
  //   var userPlace = $('#icon_prefix2').val().trim();
  //   $type = tripType;
  //   $place =  userPlace;
  //   start_trip();
   
  //   console.log($place);
  //   console.log($type);

  // });/*End of WEEK on click funtion*/
  // ===================END OF BUTTONS THAT CAN BE DELETED ===============

	// Click listener to seeDo value to add to an array
	$("#seeDoBtn").on("click", function(){
	    if ($('#seeDo').val().length == 0) {
	      alert('I think you pressed the wrong button, your PLACES TO SEE & DO field is empty');

		}else {var seeDo = $("#seeDo").val().trim();
			    $seeDo.push(seeDo);
			    console.log($seeDo);
			};

	    $('#seeDo').val("");
	    return false;

	});/* END of seeDoBtn button */

	// Click listener to eatDrink value to add to an array
	$("#eatDrinkBtn").on("click", function(){
	    if ($('#eatDrink').val().length == 0) {
	      alert('I think you pressed the wrong button, your Eat/Drink field is empty');

		}else {var eatDrink = $("#eatDrink").val().trim();
	    		$eatDrink.push(eatDrink);
	    		console.log($eatDrink);
				};

	    $('#eatDrink').val("");
	    return false;

	});/* END of eatDrink button */

	// Click listener to Sleep value to add to an array
	$("#sleepBtn").on("click", function(){
	    
	if ($('#sleep').val().length == 0) {
	      alert('I think you pressed the wrong button, your PLACES TO SLEEP field is empty');

		}else{var sleep = $("#sleep").val().trim();
			    $sleep.push(sleep);
			    console.log($sleep);
				};

	    $('#sleep').val("");
	    return false;

	});/* END of sleep button */



	// This is test button to check my update to the database, but a reminder we need a SAVE button
	$("#donebtn").on("click", function(event){
	    addTo();
	    event.preventDefault();
		hideAll();
		$("#page3").show();
		getData();

	});/* END of TEST seedo2 button */




  // Grab values from screen and create variables to use in my methods
  $place = "";
  $type = "";
  $key = ""; /*Not sure I can get this number in here*/
  $seeDo = [];
  $eatDrink = [];
  $sleep = [];
  $notes = "";
  $lat = 30.267153;
  $lng = -97.7430608;
  $placeID = "";


  function start_trip() {
    $("#details").html("<h5>My <strong>"+$type+"</strong> plans to <strong>"+$place+"</strong> will include</h5>");

    var googleKey = 'AIzaSyAxNtwAwM8tjrDJJQQSHfJzgepd1YI54_E';
    // Google API to get lat/lng or place_id
    queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+$place+"&key="+googleKey;

    $.ajax({
      url: queryURL,
      method: 'GET'
      
      }).done(function(json) {
          // Do we need to grab to lat long and put them in the data base?
          console.log(json);
          // console.log(json.results[0].place_id);
          $placeID = json.results[0].place_id;
          console.log($placeID);
          // console.log(json.results[0].geometry.location.lat);
          $lat = json.results[0].geometry.location.lat;
          console.log($lat);
          // console.log(json.results[0].geometry.location.lng);
          $lng = json.results[0].geometry.location.lng;
          console.log($lng);

          printMap();

          push_trip();

          console.log($lat)
          console.log($lng)


          }); /*End of googl ajax call*/

          
          
  }/*End of start_trip function*/


  function printMap() {
    	map = new google.maps.Map(document.getElementById('newMap'), {
          center: {lat: $lat, lng: $lng},
          zoom: 12
        });
      }


  function push_trip() {
    //This is creating one "parent" in the data base named "trips"
    var trips = database.ref("trips")
    $key = trips.push({

        place: $place,
        type: $type,
        see_do: $seeDo,
        eat_drink: $eatDrink,
        sleep: $sleep,
        notes: $notes,
        lat: $lat,
        lng: $lng,
        place_ID: $placeID
        }).key;

    // empty the local keys after the UPDATE to the database NOT on the PUSH
    // empty();
   
    
    var newData = {};
	newData['/trips/'+$key]= {
								
								    key: $key,
								    place: $place,
						        type: $type,
						        see_do: $seeDo,
						        eat_drink: $eatDrink,
						        sleep: $sleep,
						        notes: $notes,
						        lat: $lat,
						        lng: $lng,
						        place_ID: $placeID
							};

	database.ref().update(newData);

  };


	function addTo(){
    	
		var ref = firebase.database().ref("trips");
		ref.orderByChild("key").limitToLast(1).on("child_added", function(snapshot) {
		  // console.log(snapshot.key);
		  var Key = (snapshot.key);
		  	
		  	// updating data for three new key pairs without deleting original data. Need to figure out how to get the key in place
			/*It is not seeing this var value*/
					trips.update({

						[Key +'/to_do']: $seeDo,
						[Key +'/to_eat']: $eatDrink,
						[Key +'/to_sleep']: $sleep
						// "-KSgEKKGo7uoX1oPb_AX/to_eat": $eatDrink,
						// "-KSgEKKGo7uoX1oPb_AX/to_sleep": $sleep

					});/*end of trips.update*/

		});/*end of snapshot*/

	};/*END of addTO function*/


  
  function empty() {
    $place = "";
    $type = "";
    $key = 0; /*Not sure I can get this number in here*/
    $seeDo = [];
    $eatDrink = [];
    $sleep = [];
    $notes = "";
    $lat = 0;
    $lng = 0;
    $place_ID = 0;

  };/*End of empty function*/

		var destination = [];
		var idKey = [];
		var type = [];

		function getData() {
			database.ref("trips").once("value", function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {

		    	var key = childSnapshot.key;
		    	var childData = childSnapshot.val();
		    	idKey.push(key);
		    	destination.push(childData.place);
		    	type.push(childData.type);
		    // 	console.log(snapshot.val());
		    // 	console.log(snapshot);
		    //     console.log(key);
		  		// console.log(childData.place);
		  		// console.log(childData.type);
		  		createButtons();
		  		});
			});
		}

		function createButtons(){

			$('#dayList').empty();
			$('#weekEndList').empty();
			$('#weekList').empty();


			for (var i = 0; i < destination.length; i++) {

				var button = $('<button>')
				button.addClass('buttons');
				button.text(destination[i]);
				button.attr({'id': idKey[i], 'data-destination': destination[i], 'data-type': type[i]});
		// console.log(button.data('type'))
				if (button.data('type') == 'day') {

					$('#dayList').append(button);

				} else if (button.data('type') == 'weekend') {

					$('#weekEndList').append(button);

				} else if (button.data('type') == 'week') {

					$('#weekList').append(button);

				}
				$(button).on("click",function(event){
				event.preventDefault();
			 	hideAll();
			 	$("#page4").show();

			 	});

			}

				
		}



		  

		// =======pulling data from the database===============

		trips.on("value", function(snapshot) {

			// var seeS = snapshot.val().key.see; 

			// Print the initial data to the console.
			// console.log(snapshot.val()[key].city);
			console.log(snapshot.val());
			console.log(snapshot.exportVal());
			// console.log(JSON.stringify(seeS));
			// console.log(snapshot.val().austin.sleep);
			// console.log(snapshot.val().austin.sleep.length);
			// console.log(snapshot.val().austin.city);
			// console.log(snapshot.val().houston.city);
		});

// trips.limitToLast(1).on("value", function(snapshot) {
// 	console.log(snapshot.name());
// });



	window.map = printMap;

})();



// ============================================TURNED OFF FOR TEST=========================
// turned off .rady fuction to see if Maps will work. 
// $(document).ready(function() {

// 	$("#page2").hide();
// 	$("#page1btn").click(function(){
// 		$("#page1").hide();
// 		$("#page2").show();

// 	});

// 	$("#page2").hide();
// 	$("#page1btn2").click(function(){
// 		$("#page1").hide();
// 		$("#page2").show();

// 	});

// 	$("#page2").hide();
// 	$("#page1btn3").click(function(){
// 		$("#page1").hide();
// 		$("#page2").show();

// 	});

	
// 	  // Initialize Firebase
// 	  var config = {
// 	    apiKey: "AIzaSyCJc9HSfoAU52BKbniU98Tb4JaiYPCvxkI",
// 	    authDomain: "tripmaker-adbb4.firebaseapp.com",
// 	    databaseURL: "https://tripmaker-adbb4.firebaseio.com",
// 	    storageBucket: "",
// 	    messagingSenderId: "9591901571"
// 	  };

// 	  firebase.initializeApp(config);

// 	var database = firebase.database();

// 	// ===on click function to grab the value from the input====
// 	$("#page1btn").on("click", function(){
// 		var tripType = $('#page1btn').val().trim();
// 		var userPlace = $('#icon_prefix2').val().trim();
// 		newTrip.$type = tripType;
// 		newTrip.$place =  userPlace;
// 		newTrip.start_trip();

		
// 		console.log(newTrip.$place);
// 		console.log(newTrip.$type);
		


//  	});/*End of DAY on click funtion*/


// 	$("#page1btn2").on("click", function(){
// 		var tripType = $('#page1btn2').val().trim();
// 		var userPlace = $('#icon_prefix2').val().trim();
// 		newTrip.$type = tripType;
// 		newTrip.$place =  userPlace;
// 		newTrip.start_trip();

// 	$("#page1btn3").on("click", function(){
// 		var tripType = $('#page1btn3').val().trim();
// 		var userPlace = $('#icon_prefix2').val().trim();
// 		newTrip.$type = tripType;
// 		newTrip.$place =  userPlace;
// 		newTrip.start_trip();


// 		console.log(newTrip.$place);
// 		console.log(newTrip.$type);

//  	});/*End of WEEK on click funtion*/

// // function map() {
// //   var mapCanvas = document.getElementById("newMap");
// //   var mapOptions = {
// //     center: new google.maps.LatLng(newTrip.$lat, newTrip.$lng), zoom: 10
// //   };
// //   var map = new google.maps.Map(mapCanvas, mapOptions);
// // };



// var newTrip = {

// 	// Grab values from screen and create variables to use in my methods
// 	$place: "",
// 	$type: "",
// 	key: 0, /*Not sure I can get this number in here*/
// 	$seeDo: [],
// 	$eatDrink: [],
// 	$sleep: [],
// 	$notes: "",
// 	$lat:0,
// 	$lng:0,
// 	$placeID:0,

// 	// get city and print map to screen, get city and type and print to same page
// 	// will work on an on click method on first new trip screen
// 	start_trip: function(){

// 		$("#destination").html("I want my "+newTrip.$type+" plans to "+newTrip.$place+" to include");

// 		var googleKey = 'AIzaSyAxNtwAwM8tjrDJJQQSHfJzgepd1YI54_E';
// 		// Google API to get lat/lng or place_id
// 		queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+newTrip.$place+"&key="+googleKey;

// 		$.ajax({
// 			url: queryURL,
// 			method: 'GET'
			
// 			}).done(function(json) {
// 					// Do we need to grab to lat long and put them in the data base?
// 					console.log(json);
// 					// console.log(json.results[0].place_id);
// 					newTrip.$placeID = json.results[0].place_id;
// 					console.log(newTrip.$placeID);
// 					// console.log(json.results[0].geometry.location.lat);
// 					newTrip.$lat = json.results[0].geometry.location.lat;
// 					console.log(newTrip.$lat);
// 					// console.log(json.results[0].geometry.location.lng);
// 					newTrip.$lng = json.results[0].geometry.location.lng;
// 					console.log(newTrip.$lng);

// 					}); /*End of googl ajax call*/
					
// 					// This is printing to the screen but should be out of this function
// 					$("#map").html('<iframe width="100%" height="250px" src=https://www.google.com/maps/embed/v1/place?key='
// 						+googleKey+'&q='+newTrip.$place+'></iframe>');
					
				
// 		// ===================Shannon's Weather API call====================================================
// 		// $('#addLocation').on('click', function(){

// 		// 		// Here we grab the text from the input box 
// 		// 		var city = $('#location-input').val().trim();

// 		// 		// Here we assemble our URL 
// 		// 		var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=29ce5f4e343c631c7edc5ddd5dbeec3f";


// 		// 		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

// 		// 			// Retrieves the Location Weather Data
// 		// 			var currentWeather = response.main.weather;

// 		// 			$('#LocationWeatherView').append(currentWeather);
// 		// 			})
// 		// 				return false;
// 		// 		});/*End of on click funtion*/ 
// 		// ====END ============Shannon's Weather API call====================================================				
		

// 	}, /*End of start_trip function*/

// 	print_map: function(){

// 		var mapCanvas = $("#newMap");
//   		var mapOptions = {
//     		center: new google.maps.LatLng(newTrip.$lat, newTrip.$lng), 
//     		zoom: 10
//   			};

//   		var map = new google.maps.Map(mapCanvas, mapOptions);
//   		// return map;

// 	},




// 	// relies on 4 onclicks to add values to the vars above, *need to add to the 3 arrays
// 	// then the "save trip" on click will push everything to the Database
// 	push_trip: function(){

// 		//This is creating one "parent" in the data base named "trips"
// 		var trips = database.ref("trips")
// 		trips.push({

// 				place: $place,
// 				type: $type,
// 				key: key,
// 				see_do:$seeDo,
// 				eat_drink: $eatDrink,
// 				sleep: $sleep,
// 				notes: $notes,
// 				lat: $lat,
// 				lng: $lng,
// 				place_ID: $placeID
// 				}).key;

// 		// empty the local keys after the push to the database
// 		newTrip.empty();
// 	},

// 	// clear the keys so they don't screw up the next new trip
// 	empty: function(){

// 		newTrip.$place = "";
// 		newTrip.$type = "";
// 		newTrip.key = 0; /*Not sure I can get this number in here*/
// 		newTrip.$seeDo = [];
// 		newTrip.$eatDrink = [];
// 		newTrip.$sleep = [];
// 		newTrip.$notes = "";
// 		newTrip.lat = 0;
// 		newTrip.lng = 0;
// 		newTrip.place_ID = 0;

// 	},


	

	
	

	
// };/*End of newTrip OBJECT*/
// ============================turned off for TEST===========================


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



// At the initial load, get a snapshot of the current data.
// firebase.database().ref("trips").on("value", function(snapshot) {

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

// firebase.database().ref("trips").limitToLast(5).on("child_added", function(snap) {
//   // can we do a limit to all children?
//   	console.log(snap.val().key);
//   	// console.log(snap.val().city2);
// });


// });/*END OF .ready function*/


