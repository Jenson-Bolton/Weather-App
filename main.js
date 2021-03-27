const appid = "0b2267613a2044aad5b45e8d8be085f4";

var data;
var elementDescription = document.getElementById("description");
var elementIcon = document.getElementById("icon");
var elementImage = document.getElementById("image")
var elementLocation = document.getElementById("location");
var elementTemp = document.getElementById("temp");
var elementTitle = document.getElementById("title");
var fetchURL;
var isCreditsShowing = false;
var testLat = 35.15548205564309;
var testLong = 129.05662890144893;
var userLat;
var userLong;

function reqListener() {
    data = JSON.parse(this.responseText);
    console.log(data);
    elementLocation.innerHTML = data.name;
    elementDescription.innerHTML = data.weather[0].description;
    elementIcon.href = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    elementImage.alt = data.weather[0].description;
    elementImage.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    elementTemp.innerHTML = Math.round(data.main.temp);
    elementTitle.innerHTML = data.weather[0].main + " - Weather";
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
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;

    fetchURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLong + "&units=metric&appid=" + appid;
      
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('get', fetchURL, true);
    oReq.send();
}

getLocation()
setInterval(() => { getLocation(); }, 600000);