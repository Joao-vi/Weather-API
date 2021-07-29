const api = {
  key: "9c10c49796e361fc05f47dc8a632d2be",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};
const timeAPI = {
  key: "e24b843d07184b00aa21dae58f9ca272",
  base: "https://api.ipgeolocation.io/timezone?apiKey=",
};
const iconsWeather = "http://openweathermap.org/img/wn/";
requestWeather("cuiaba");
const searchBtn = document.querySelector("#searchBtn");

const searchBar = document.querySelector("#searchBar");

// Event listenner

searchBtn.addEventListener("click", () => {
  requestWeather(searchBar.value);
});

searchBar.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    requestWeather(searchBar.value);
  }
});

// Functions

function requestWeather(city) {
  fetch(
    `${api.base}weather?q=${city}&units=${api.units}&lang=${api.lang}&appid=${api.key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData);
      displayOnHtml(weatherData);
    })
    .catch((error) => {
      console.log("err", error);
    });
}

function displayOnHtml(data) {
  let tags;
  document.querySelector("#name").textContent = data.name;
  document.querySelector("#speed").textContent = data.wind.speed;
  document.querySelector(
    "#icon"
  ).style.backgroundImage = `url('${iconsWeather}/${data.weather[0].icon}@2x.png')`;
  document.querySelector("#visibility").textContent = data.visibility / 1000;
  document.querySelector("#description").textContent =
    data.weather[0].description;
  for (let prop in data.main) {
    tag = document.querySelector("#" + prop);
    if (tag) {
      if (prop == "temp") {
        tag.textContent = Math.round(data.main[prop]) + "°c";
      } else {
        tag.textContent = data.main[prop];
      }
    }
  }
  document.querySelector("#date").textContent = requestDate(
    data.coord.lat,
    data.coord.lon
  );
}

function requestDate(lat, lon) {
  let date;
  fetch(`${timeAPI.base}${timeAPI.key}&$lat=${lat}&long=${lon}`)
    .then((response) => {
      return response.json();
    })
    .then((timeData) => {
      document.querySelector("#country").textContent =
        timeData.geo.country_name;
      date = displayDate(timeData.date_time_txt);
    })
    .catch((er) => {
      console.log(er);
    });

  return date;
}

function displayDate(time) {
  time.replace(",", " ");
  arrayDate = time.split(" ");
  return `${arrayDate[0]} ${arrayDate[2]} ${arrayDate[1]} ${arrayDate[3]}`;
}
