const foodMap = document.querySelector(".foodmap");


if (foodMap) {
  var food =
    new google.maps.Map(foodMap, {
      zoom: 13,
      center: {
        lat: 0.0,
        lng: 0.0
      }
  });

  navigator.geolocation.getCurrentPosition((result) => {
    const { latitude, longitude } = result.coords;

    // food.setCenter({ lat: latitude, lng: longitude });
    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: food,
      title: "Your Location",
      animation: google.maps.Animation.DROP
    });
  });

  // markers = [];

  axios
    .get("/resto/data")
    .then(response => {
      const restoList = response.data;
      restoList.forEach(oneResto => {
        setMarkers(oneResto, food);
        // console.log(oneResto)
        // const [lat, lng] = oneResto.location.coordinates;
        // marker = new google.maps.Marker({
        //   position: { lat, lng },
        //   map: food,
        //   title: oneResto.name,
        //   animation: google.maps.Animation.DROP
        });
        // markers.push(marker);
          // oneResto.onclick = toggleBounce();
      });
}
//   })
//   .catch(err => {
//     alert("Something went wrong! 💩");
// });

function setMarkers(oneResto, map) {
  // Adds markers to the map.
      const [lat, lng] = oneResto.location.coordinates;
      var place = oneResto.type;
          marker = new google.maps.Marker({
          position: {lat, lng},
          map: map,
          animation: google.maps.Animation.DROP,
          title: oneResto.name,
      });
      attachRestTitle(marker,{lat, lng}, oneResto._id);
  }

  function attachRestTitle(marker, coords, id) {
    var infowindow = new google.maps.InfoWindow({
        content: marker.title
    });

    function toggleBounce() {      
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        food.setCenter(coords);
      }
    }

    // marker.addListener('click', toggleBounce);
   var choosing = document.querySelector(`.li-${id}`)  
   choosing.onclick = toggleBounce;
}



document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var locationInput = document.querySelector(".location-input");

if (locationInput) {
  var latInput = document.querySelector(".lat-input");
  var lngInput = document.querySelector(".lng-input");

  var autocomplete = new google.maps.places.Autocomplete(locationInput);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const loc = place.geometry.location;

    latInput.value = loc.lat();
    lngInput.value = loc.lng();
  });
}