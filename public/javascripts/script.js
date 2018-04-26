const foodMap = document.querySelector(".foodmap");


const food =
  new google.maps.Map(foodMap, {
    zoom: 13,
    center: {
      lat: 0.0,
      lng: 0.0
    }
});

navigator.geolocation.getCurrentPosition((result) => {
  const { latitude, longitude } = result.coords;

  food.setCenter({ lat: latitude, lng: longitude });
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: food,
    title: "Your Location",
    animation: google.maps.Animation.DROP
  });
});



axios
  .get("/resto/data")
  .then(response => {
    const restoList = response.data;
    restoList.forEach(oneResto => {
      const [lat, lng] = oneResto.location.coordinates;
      new google.maps.Marker({
        position: { lat, lng },
        map: food,
        title: oneResto.name,
        animation: google.maps.Animation.DROP
      });
    });
  })
  .catch(err => {
    alert("Something went wrong! 💩");
});



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