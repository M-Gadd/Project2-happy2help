const medMap = document.querySelector(".medmap");

const med =
  new google.maps.Map(medMap, {
    zoom: 13,
    center: {
      lat: 0.0,
      lng: 0.0
    }
});

navigator.geolocation.getCurrentPosition((result) => {
  const { latitude, longitude } = result.coords;

  med.setCenter({ lat: latitude, lng: longitude });
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
      const [lat, lng] = oneMed.location.coordinates;
      new google.maps.Marker({
        position: { lat, lng },
        map: med,
        title: oneMed.name,
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
