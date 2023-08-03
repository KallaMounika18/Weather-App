const apiKey = "8243f9e26a8f50788c219b6009290554";
const apiUrl1 =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall/timemachine?";
const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const locationBtn = document.getElementById("get-location");

async function checkWeather(city) {
  const response = await fetch(apiUrl1 + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    show(data);
    document.querySelector(".weather").style.display = "block";
  }
}

async function getData(lat, long) {
  const promise = await fetch(
    apiUrl2 + `lat={lat}` + `&lon={lon}` + `&appid={apiKey}`
  );

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await promise.json();

    console.log(data);
    show(data);
    document.querySelector(".weather").style.display = "block";
  }
}

function show(data) {
  document.querySelector(".error").style.display = "";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "mist.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "drizzle.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "rain.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "snow.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

async function gotLocation(position) {
  const result = await getData(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);
}

function gotLocation(position) {}
function failedToGet() {
  console.log("There was some issue");
}

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});
