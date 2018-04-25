const mapDiv = document.querySelector(".my-map");

const map =
  new google.maps.Map(mapDiv, {
    zoom: 13,
    center: {
      lat: 0.0,
      lng: 0.0
    }
});

navigator.geolocation.getCurrentPosition((result) => {
  const { latitude, longitude } = result.coords;

  map.setCenter({ lat: latitude, lng: longitude });
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: "Your Location",
    animation: google.maps.Animation.DROP
  });
});

const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


const locationInput = document.querySelector(".location-input");
const latInput = document.querySelector(".lat-input");
const lngInput = document.querySelector(".lng-input");

const autocomplete = new google.maps.places.Autocomplete(locationInput);

autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();
  const loc = place.geometry.location;

  latInput.value = loc.lat();
  lngInput.value = loc.lng();
});