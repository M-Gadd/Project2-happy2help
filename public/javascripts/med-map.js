const medMap = document.querySelector(".medmap");

if (medMap) {
  var med =
    new google.maps.Map(medMap, {
      zoom: 13,
      center: {
        lat: 0.0,
        lng: 0.0
      }
  });

  navigator.geolocation.getCurrentPosition((result) => {
    const { latitude, longitude } = result.coords;

    // med.setCenter({ lat: latitude, lng: longitude });
    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: med,
      title: "Your Location",
      animation: google.maps.Animation.DROP
    });
  });

  axios
    .get("/medical/data")
    .then(response => {
      const medList = response.data;
      medList.forEach(oneMed => {
        setMedMarkers(oneMed, med);
        
      //   const [lat, lng] = oneMed.location.coordinates;
      //   new google.maps.Marker({
      //     position: { lat, lng },
      //     map: med,
      //     title: oneMed.name,
      //     animation: google.maps.Animation.DROP
        });
      });
}
//   })
//   .catch(err => {
//     alert("Something went wrong! 💩");
// });

function setMedMarkers(oneResto, map) {
  // Adds markers to the map.
      const [lat, lng] = oneResto.location.coordinates;
      var place = oneResto.type;
          marker = new google.maps.Marker({
          position: {lat, lng},
          map: map,
          animation: google.maps.Animation.DROP,
          title: oneResto.name,
      });
      attachMedTitle(marker,{lat, lng}, oneResto._id);
  }

  function attachMedTitle(marker, coords, id) {
    var infowindow = new google.maps.InfoWindow({
        content: marker.title
    });

    function toggleBounce() {      
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        med.setCenter(coords);
      }
    }

    // marker.addListener('click', toggleBounce);
   var choosing = document.querySelector(`.lii-${id}`)  
   choosing.onclick = toggleBounce;
}

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var locationInput2 = document.querySelector(".location-input2");

if (locationInput2) {
  var latInput2 = document.querySelector(".lat-input2");
  var lngInput2 = document.querySelector(".lng-input2");
  
  var autocomplete2 = new google.maps.places.Autocomplete(locationInput2);
  
  autocomplete2.addListener("place_changed", () => {
    const place = autocomplete2.getPlace();
    const loc = place.geometry.location;
  
    latInput2.value = loc.lat();
    lngInput2.value = loc.lng();
  });
}
