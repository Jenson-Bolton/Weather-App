const appid = "0b2267613a2044aad5b45e8d8be085f4";

var data;
var elementDescription = document.getElementById("description");
var elementImage = document.getElementById("image")
var elementLocation = document.getElementById("location");
var elementTemp = document.getElementById("temp");
var fetchURL;
var userLat;
var userLong;

function reqListener() {
    data = JSON.parse(this.responseText);
    console.log(data);
    elementLocation.innerHTML = data.name;
    elementDescription.innerHTML = data.weather[0].description;
    elementImage.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    elementImage.alt = data.weather[0].description;
    elementTemp.innerHTML = Math.round(data.main.temp);
}
    
function reqError(err) {
    console.log('Fetch Error :-S', err);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        elementLocation.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    /*elementLocation.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;*/
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    /*fetchURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLong + "&appid=" + appid;
    fetch(fetchURL)
        .then(response => response.json())
        .then(data => weatherData = data);
    console.log(weatherData);*/

    fetchURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLong + "&units=metric&appid=" + appid;
      
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('get', fetchURL, true);
    oReq.send();
}

function showRefresh() {
    
}

getLocation();
setTimeout(() => {  console.log("World!"); }, 30000);