const transportation = document.querySelector(".trans-map");


const tranMap = new google.maps.Map(transportation, {
  zoom: 13,
  center: {
    lat: 0.0,
    lng: 0.0
  }
});

var currentLocation ={};
navigator.geolocation.getCurrentPosition(result => {
  const { latitude, longitude } = result.coords;

  tranMap.setCenter({ lat: latitude, lng: longitude });
  currentLocation = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: tranMap,
    title: "Your Location",
  });
});


var mode = document.querySelector('#mode');
/******************************SETTING ORIGIN*************************************/
const locationInputF = document.querySelector(".location-inputF");
const latInputF = document.querySelector(".lat-inputF");
const lngInputF = document.querySelector(".lng-inputF");

const autocompleteF = new google.maps.places.Autocomplete(locationInputF);

var firstMarker = {}
autocompleteF.addListener("place_changed", () => {
  const place = autocompleteF.getPlace();
  const loc = place.geometry.location;
 
  latInputF.value = loc.lat();
  lngInputF.value = loc.lng();

  firstMarker = new google.maps.Marker({
    position: { lat: loc.lat(), lng: loc.lng()},
    map: tranMap,
    title: "Origin",
    animation: google.maps.Animation.directionsDisplay
  })

});
/******************************SETTING DESTINATION*************************************/
const locationInputT = document.querySelector(".location-inputT");
const latInputT = document.querySelector(".lat-inputT");
const lngInputT = document.querySelector(".lng-inputT");

const autocompleteT = new google.maps.places.Autocomplete(locationInputT);

var secondMarker = {}
autocompleteT.addListener("place_changed", () => {
  const place = autocompleteT.getPlace();
  const loc = place.geometry.location;
 
  latInputT.value = loc.lat();
  lngInputT.value = loc.lng();

  secondMarker = new google.maps.Marker({
    position: { lat: loc.lat(), lng: loc.lng()},
    map: tranMap,
    title: "Destination",
    animation: google.maps.Animation.directionsDisplay
  })

});


/***************************SETTING THE ROUTE *************************************/
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();
var route = document.querySelector('.route');

var current = document.querySelector('#current');
current.onclick = ()=>{
firstMarker = currentLocation;
locationInputF.value = currentLocation.title;
}


route.onclick = ()=>{
  const directionRequest = {
    origin: {lat: firstMarker.position.lat(), lng: firstMarker.position.lng()},
    destination: {lat: secondMarker.position.lat(), lng: secondMarker.position.lng()},
    travelMode: mode.value
  };
  
  directionsService.route(
    directionRequest,
    function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
  
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }
  );
  directionsDisplay.setMap(tranMap);
}
