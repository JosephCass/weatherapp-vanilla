// import style from "./styles.css";
// import appLogo from "./headerimage.png";

let searchBar = document.querySelector("#searchCity");
let cityDisplay = document.querySelector(".weather-city");
let searchError = document.querySelector(".search-error");
let contentDiv = document.querySelector(".weather-display-box");
let quickWeatherDisplay = document.querySelector(".weather-quick");
let temperatureDisplay = document.querySelector(".weather-temp");
let weatherIcon = document.querySelector(".weather-icon");
let weatherDetails = document.querySelector(".weather-details");
let searchBtn = document.querySelector(".search-city-btn");

async function fetchData() {
  try {
    let searchVal = searchBar.value;
    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchVal}&APPID=ac0c4661f4403ae896e4b2d2d9d84414&units=imperial`,
      { mode: "cors" }
    );

    //Handles invalid search queries
    if (!response.ok) {
      throw Error(response.statusText);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function addWeatherIcon(data) {
  // https://openweathermap.org/weather-conditions
  let iconSrc = data.weather[0].icon;
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconSrc}@2x.png`;
  weatherIcon.classList.add("sized");
}

function changeDivBackground(data) {
  let temperature = data.main.temp;
  if (temperature >= 80) {
    contentDiv.style.backgroundImage =
      "linear-gradient(299deg, rgba(255,147,0,1) 0%, rgba(255,0,0,1) 100%)";
  } else if (temperature <= 45) {
    contentDiv.style.backgroundImage =
      "linear-gradient(86deg, rgba(0,63,255,1) 0%, rgba(0,234,255,1) 41%, rgba(219,224,236,1) 100%)";
  } else if (temperature >= 60 && temperature < 80) {
    contentDiv.style.backgroundImage =
      "linear-gradient(86deg, rgba(247,255,0,1) 0%, rgba(54,255,0,1) 100%)";
  } else if (temperature > 45 && temperature < 60) {
    contentDiv.style.backgroundImage =
      "linear-gradient(8deg, rgba(211,211,74,0.8393732492997199) 0%, rgba(31,125,249,1) 100%)";
  }
}

async function updateUI(data) {
  let finishedData = await data;
  cityDisplay.textContent = `${finishedData.name}`;
  temperatureDisplay.textContent = `${finishedData.main.temp} ℉`;
  addWeatherIcon(finishedData);
  changeDivBackground(finishedData);
  addWeatherDescription(finishedData);
}

function addWeatherDescription(data) {
  weatherDetails.textContent = data.weather[0].description;
}

searchBar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let data = fetchData();
    async function waitData() {
      let logged = await data;
      console.log(logged);
    }
    waitData();
    updateUI(data);
  }
});

searchBtn.addEventListener("click", function () {
  let data = fetchData();
  async function waitData() {
    let logged = await data;
    console.log(logged);
  }
  waitData();
  updateUI(data);
});
