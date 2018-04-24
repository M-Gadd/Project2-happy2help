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