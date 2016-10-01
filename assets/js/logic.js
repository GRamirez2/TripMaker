var newTrip = (function() {

 

	
	firstHide()

	function firstHide(){
  		$("#page2").hide();
		$("#page3").hide();
		$("#page4").hide();
  	};

	
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


  // ==========on click function to grab the value from the input=================

  $("#page1btn").on("click", function(event){

  		event.preventDefault();

  		if ($('#destination').val().length == 0) {

	      alert("Whoops - you forgot to indicate a destination for your trip");

		}else {var userPlace = $('#destination').val().trim();
    			var tripType = $("input[name=tripType]:checked").val();
    				$place =  userPlace;
    				$type = tripType;

				    start_trip();
				    hideAll();
				    weather();

					$("#page2").show();

				    console.log($place);
				    console.log($type);
				 };

				$("#destination").val("");


	});/*============ End of START TRIP on click function =======================*/



	// ===============Click listener to seeDo value to add to an array =================

	$("#seeDoBtn").on("click", function(event){

		event.preventDefault();

	    if ($('#seeDo').val().length == 0) {
	      alert('I think you pressed the wrong button, your PLACES TO SEE & DO field is empty');

		}else {var seeDo = $("#seeDo").val().trim();
			    $seeDo.push(seeDo);
			    console.log($seeDo);
			};

	    $('#seeDo').val("");

	});/* ================END of seeDoBtn button ================ */


	// ===============Click listener to eatDrink value to add to an array
	$("#eatDrinkBtn").on("click", function(event){

		event.preventDefault();

	    if ($('#eatDrink').val().length == 0) {
	      alert('I think you pressed the wrong button, your Eat/Drink field is empty');

		}else {var eatDrink = $("#eatDrink").val().trim();
	    		$eatDrink.push(eatDrink);
	    		console.log($eatDrink);
				};

	    $('#eatDrink').val("");
	    

	});/* ================== END of eatDrink button */


	// ================== Click listener to Sleep value to add to an array
	$("#sleepBtn").on("click", function(event){

		event.preventDefault();
	    
		if ($('#sleep').val().length == 0) {
	      alert('I think you pressed the wrong button, your PLACES TO SLEEP field is empty');

		}else{var sleep = $("#sleep").val().trim();
			    $sleep.push(sleep);
			    console.log($sleep);
				};

	    $('#sleep').val("");
	   

	});/* =================== END of sleep button ====================== */



	// ================== This SAVE MY LIST btn click sends data to the server ========
	$("#donebtn").on("click", function(event){
	    
		    event.preventDefault();

		    if($seeDo.length === 0 && $eatDrink.length === 0 && $sleep.length === 0){

		    	/*&& $eatDrink.length && $sleep.length */
		    	alert("You need to add at least one item to save your list");

		    }else{

				    hideAll();
					$("#page3").show();

				    addTo();
				    getData();

				};

	});/* ================ END of SAVE MY LIST on click =============== */

	//=========== BEGINING OF click function for TRIPS button =========================//

		$(document).on("click", ".buttons", showData);
		


	// =============== END of TRIPS button click function ===========================




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
  		var tripp = $type.toUpperCase()
  		var placee = $place.toUpperCase()
	    $("#details").html('<h4>Plans for my '+ tripp +' in '+ placee +' include:</h4>');

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
	        to_do: $seeDo,
	        to_eat: $eatDrink,
	        to_sleep: $sleep,
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
							        to_do: $seeDo,
							        to_eat: $eatDrink,
							        to_sleep: $sleep,
							        notes: $notes,
							        lat: $lat,
							        lng: $lng,
							        place_ID: $placeID
								};

		database.ref().update(newData);

		$seeDo = [];
  		$eatDrink = [];
  		$sleep = [];

  	};/*============== End of push_trip*/


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
	    $key = 0; /*Have to do a push, then a quick update to get in here*/
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

	/*========= BEGINING of getData function ============*/
  function getData() {

		destination = [];
		idKey = [];
		type = [];

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
	}/*========= END of getData function ======================*/


	/*=========== BEGINING of createButtons funtions ==============*/
  function createButtons(){

		$('#dayList').empty();
		$('#weekEndList').empty();
		$('#weekList').empty();


		for (var i = 0; i < destination.length; i++) {

			var button = $('<button>')
			button.addClass('buttons');
			var PLACE = destination[i].toUpperCase();
			button.text(PLACE);
			button.attr({'id': idKey[i], 'data-destination': destination[i], 'data-type': type[i]});
			// console.log(button.data('type'))
			if (button.data('type') == 'day') {

				$('#dayList').append(button);

			} else if (button.data('type') == 'weekend') {

				$('#weekEndList').append(button);

			} else if (button.data('type') == 'week') {

				$('#weekList').append(button);

			}
		
		}

	}/*========== end of createButton function ===============*/

	//=============== Begining of showData function, PAGE 4===================
  function showData (){	

		hideAll();	
		$("#page4").show();

		$('#doSee').empty();
		$('#eatList').empty();
		$('#placesSleep').empty();
				

			var key = $(this).attr('id');
			console.log(key);


				database.ref("trips/" + key).on("value", function(snapshot) {

					  	// The global arrays are empty except for the lat/lng default
							      		// console.log($place);
									    // console.log($type);
									    // console.log($key);
									    // console.log($seeDo);
									    // console.log($eatDrink);
									    // console.log($sleep);
									    // console.log($notes);
									    // console.log($lat);
									    // console.log($lng);
									    // console.log($placeID);
					   		       
							console.log(snapshot.val()); /*a reference of everything*/

							$key = snapshot.val().key
							console.log($key);

							$lat = snapshot.val().lat
							console.log($lat);

							$lng = snapshot.val().lng
							console.log($lng);

							$place = snapshot.val().place
							console.log($place);

							$type = snapshot.val().type
							console.log($type);

					       	var toDo = snapshot.val().to_do;
					       	// console.log(JSON.stringify(array));/*make a clean array*/
					       	// $seeDo = JSON.stringify(array)
					       	// console.log($seeDo)
					       	// console.log(snapshot.val().to_do);/*can loop through this format and print?*/
					       	var toEat = snapshot.val().to_eat;
					       	var toSleep = snapshot.val().to_sleep;

					       	var trip = $type.toUpperCase();
					       	var place = $place.toUpperCase();
					       	var details = '<h4>Plans for my '+ trip +' in '+ place +' include:</h4>';
					       	$("#details2").html(details);

					       		// Loop through to_do array
					       		if(typeof toDo === 'undefined' || toDo === null ){

					       			var emptylist = '<h5>' + '* * THIS LIST IS EMPTY * *' + '</h5>'
					       			$("#doSee").append(emptylist);
					       			

					       				} else if (toDo.length > -1){

							       			for (var i = 0; i < toDo.length; i++){

							       			var dolist = "<tr><td>- " + toDo[i] + "</tr></td>"
							       			$("#doSee").append(dolist);
							       			
							       			};

					       				}; /*End of else if for toDo.length*/

					       		
						       		// Loop through to_eat array
						       		if(typeof toEat === 'undefined' || toEat === null ){

						       			var emptylist = '<h5>' + '* * THIS LIST IS EMPTY * *' + '</h5>'
						       			$("#eatList").append(emptylist);
					       			

					       					} else if (toEat.length > -1){

							       					for (var i = 0; i < toEat.length; i++){

									       			var eatlist = "<tr><td>- " + toEat[i] + "</tr></td>"
									       			$("#eatList").append(eatlist);
						       			
						       						};
						       				}; /*End of else if for toEat.lenth */


								    	// Loop through to_eat array
								    	if(typeof toSleep === 'undefined' || toSleep === null ){

							       			var emptylist = '<h5>' + '* * THIS LIST IS EMPTY * *' + '</h5>'
							       			$("#placesSleep").append(emptylist);
					       			

					       						} else if (toSleep.length > -1){

										       		for (var i = 0; i < toSleep.length; i++){

										       			var sleeplist = "<tr><td>- " + toSleep[i] + "</tr></td>"
										       			$("#placesSleep").append(sleeplist);
							       			
							       					};
							       			}; /*End of else if for toSleep.lenth */
							       			  
				});/* END of on.value snapshot*/

		weather();
		printMap2();
					
	};//=============== END of showData function, PAGE 4===================

// ================ Second Print map function =============================
  function printMap2() {
	map = new google.maps.Map(document.getElementById('newMap2'), {
      center: {lat: $lat, lng: $lng},
      zoom: 12
    });
  }/*==========================  END of Scond Print map function ============*/
	
// ===========Get data from the firebase =================
		trips.on("value", function(snapshot) {

			// var seeS = snapshot.val().key.see; 
			// console.log(snapshot.val()[key].city);
			console.log(snapshot.val());/*TESTING*/
			console.log(snapshot.exportVal()); /*TESTING*/
			// console.log(JSON.stringify(seeS));
			
		});

// ===================Shannon's Weather API call====================================================
  function weather(){	

		var queryURL = "https://api.darksky.net/forecast/7b2f86a4b966bb72650a5261661e6edb/30.2671,-97.7430"

                $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

                    // Retrieves the Location Weather Data
                    var currentWeather = response.currently.temperature;

                    $('#weather').append(currentWeather);

                    console.log(currentWeather);
                    console.log(response.currently.temperature);
                    })
    }/*End of weather function*/

    
				
						
		// };/*End of on click funtion*/ 
// ====END ============Shannon's Weather API call====================================================	



	window.map = printMap;

})();

