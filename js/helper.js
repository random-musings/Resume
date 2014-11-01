/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var DATASTR ="%data%"; //the global replace string used to find and replace data in the global strings see helper.js for actual value
var HREFSTR = '#';
var CONTACTSTR ="%contact%"; //the global that replaces the contact type see helper.js for actual value


var HTMLsectionEnd = "<div class='text-align-center max-width'> <a href='#top'>back to top</a></div>"; //links back to the top of the page
var HTMLheaderName = "<h1 id='name'>%data%</h1>";
var HTMLheaderRole = "<h4>%data%</h4>";

var HTMLcontactGeneric = "<li class='flex-item'><span class='contactsize'>%contact%</span><span class='white-text'> : %data%</span></li>";
var HTMLcontactStart = "<div class='tag-vertical-space'></div><ul>";
var HTMLcontactEnd = "</ul>";

var HTMLbioPic = "<div><img src='%data%' class='biopic' alt='bio picture'></div>";
var HTMLWelcomeMsg = "<span class='welcome-message'>%data%</span>";

var HTMLskillsStart = "<h3>Skills at a Glance</h3>";
var HTMLskillsLang = "<div class='content-title-sub'>Languages</div>";
var HTMLskillsFrame = "<div class='content-title-sub'>Frameworks</div>";
var HTMLskillsDB = "<div class='content-title-sub'>Databases</div>";
var HTMLskills = " %data%";

var HTMLworkStart = "<h3>Employement History</h3>";
var HTMLworkEmployer = "<div class='tag-vertical-space'></div><a href='#' class='content-title-sub'>%data%";
var HTMLworkTitle = " - %data%</a>";
var HTMLworkDates = "<div>%data%</div>";
var HTMLworkLocation = "<div>%data%</div>";
var HTMLworkDescription = "%data% <div class='tag-vertical-space'></div>";
var HTMLworkResponsibilities  = "<span class='content-title-sub'>Responsibilities</span><div>%data%</div>";
var HTMLworkResponsibilityJoin  = ", ";
var HTMLworkResponsibilityEnd  = "<div class='vertical-space'></div><div class='tag-vertical-space'></div>";

var HTMLprojectStart = "<h3>Recent Side-Projects</h3>";
var HTMLprojectTitle = "<a href='#'><span class='content-title-sub'>%data%</span></a>";
var HTMLprojectDates = " &nbsp; &nbsp; %data%<div class='tag-vertical-space'></div>";
var HTMLprojectDescription = "%data% <div class='tag-vertical-space'></div>";
var HTMLprojectImage = "<img src='%data%' alt='project'>";
var HTMLprojectEnd = " <div class='tag-vertical-space'></div><div class='tag-vertical-space'></div>"; 


var HTMLschoolStart = "<h3>Education</h3>";
var HTMLschoolName = "<a href='#' class='content-title-sub'>%data%";
var HTMLschoolDegree = " -- %data%</a>";
var HTMLschoolDates = " %data% ";
var HTMLschoolLocation = "&nbsp;  %data% ";
var HTMLschoolMajor = "<div class='content-title-sub'>Major: <span class='white-font'> %data%</font></div>";
var HTMLschoolClasses = "<div class='content-title-sub'>Classes:</div>";
var HTMLschoolEnd = " <div class='tag-vertical-space'></div><div class='tag-vertical-space'></div>"; 

var HTMLonlineClasses = "<h3>Online Classes</h3>";
var HTMLonlineTitle = "<a href='#' class='content-title-sub'>%data%";
var HTMLonlineSchool = " - %data%</a> ";
var HTMLonlineDates = "<div>%data%</div>";
var HTMLonlineURL = "<a href='#'><span class='white-font'>%data%</span></a>";

var HTMLmapInfo = "<div class='content-title-sub'>%data%</div>";

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
var clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      "x": x,
      "y": y
    }
  );
  console.log("x location: " + x + "; y location: " + y);
}




/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() 
{

  var locations;
  var mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
	

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {
    
    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);
    
    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
			if(school && education.schools[school])
				locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
			if(job && work.jobs[job])
				locations.push(work.jobs[job].location);
    }
    return locations;
  }

	
	function formatLocationString(location)
	{
		//if( Math.abs(location.k - bio.contacts.k) <0.5
		//		&& Math.abs(location.B - bio.contacts.B) <1)
		//	return HTMLmapInfo.replace(DATASTR,bio.contacts.mapInfo);
		
		for (var school in education.schools) {
			if(school && education.schools[school])
			{
				if(Math.abs(location.k - education.schools[school].k) < 0.01
					&& Math.abs(location.B - education.schools[school].B) < 0.01)
					return HTMLmapInfo.replace(DATASTR,education.schools[school].mapInfo);
			}
    }
		
		 for (var job in work.jobs) {
			if(job && work.jobs[job])
				if(Math.abs(location.k - work.jobs[job].k) < 0.01
					&& Math.abs(location.B - work.jobs[job].B) < 0.01)
					return HTMLmapInfo.replace(DATASTR,work.jobs[job].mapInfo);
    }
		return  HTMLmapInfo.replace(DATASTR,"no additional information available");
	}
	
  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.k;  // latitude from the place service
    var lon = placeData.geometry.location.B;  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });
    
		var contentString = formatLocationString(placeData.geometry.location);
    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
			console.log(placeData.geometry.location);
			infoWindow.open(map,marker);

    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);
    
    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {
			if(place && locations[place])
			{
				// the search request object
				var request = {
					query: locations[place]
				};

				// Actually searches the Google Maps API for location data and runs the callback 
				// function with the search results after each search.
				service.textSearch(request, callback);
			}
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);
}

/*
Uncomment all the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window 
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});


