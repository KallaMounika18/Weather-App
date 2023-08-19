const apiKey = "8243f9e26a8f50788c219b6009290554";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const locationBtn = document.querySelector(".get_location");

async function getDataWithCity(city) {
  const response = await fetch(apiUrl + `q=${city}` + `&appid=${apiKey}`);
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

function show(data) {
  document.querySelector(".error").style.display = "";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

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
  getDataWithCity(searchBox.value);
});

async function getDatawithLocation(lat, long) {
  const promise = await fetch(
    apiUrl + `lat=${lat}` + `&lon=${long}` + `&appid=${apiKey}`
  );

  if (promise.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await promise.json();
    console.log(data);
    show(data);
    document.querySelector(".weather").style.display = "block";
  }
}

async function gotLocation(position) {
  const result = await getDatawithLocation(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);
}

function failedToGet() {
  console.log("There was some issue");
}

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
  else alert("Your brower does not support geolocation api");
});
