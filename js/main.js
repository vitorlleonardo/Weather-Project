const apiKey = "1a4ea16911f4543ed59d49ef307c2985";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const loader = document.querySelector("#loader");

// Functions

const toggleLoader = () => {
  loader.classList.toggle("hide");
};


const getWeatherData = async(city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data
};


const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`

  weatherContainer.classList.remove("hide");
}

// Events

searchBtn.addEventListener("click", (e) => {

  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
  if(e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
})