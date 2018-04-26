const transportation = document.querySelector(".trans-map");


const tranMap = new google.maps.Map(transportation, {
  zoom: 13,
  center: {
    lat: 0.0,
    lng: 0.0
  }
});

navigator.geolocation.getCurrentPosition(result => {
  const { latitude, longitude } = result.coords;

  tranMap.setCenter({ lat: latitude, lng: longitude });
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: tranMap,
    title: "Your Location",
    animation: google.maps.Animation.DROP
  });
});





const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();
