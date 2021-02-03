//this function is for last updated date
function formatDate(timestamp) {
  let date = new Date (timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 5) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let weekday = days[date.getDay()];
  return `${weekday} | ${hour}:${minutes}`;
}
//this functions call API and shows weather descriptions
function displayWeather(response){
    let cityName = document.querySelector("#city");
    let temperatureValue = document.querySelector("#temperature");
    let weatherDescription = document.querySelector("#currentDescription");
    let humidityValue =document.querySelector("#humidity");
    let windValue = document.querySelector("#wind");
    let iconElement = document.querySelector("#weatherIcon");
    let currentDate = document.querySelector("#currenTime");

    celsiusTemperature = response.data.main.temp;

    cityName.innerHTML= response.data.name;
    temperatureValue.innerHTML= Math.round(celsiusTemperature);
    weatherDescription.innerHTML= response.data.weather[0].description;
    humidityValue.innerHTML= Math.round(response.data.main.humidity);
    windValue.innerHTML= Math.round(response.data.wind.speed);
    iconElement.setAttribute("src",`image/${response.data.weather[0].icon}.png`)
    iconElement.setAttribute("alt",response.data.weather[0].description);
    currentDate.innerHTML = formatDate(response.data.dt * 1000);

}

function search(city){
let apiKey = "e49f4dac5b0d3a8c77d299a55302727f";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather); 
}


function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}



function displayFahrenheitTemperature (event) {
event.preventDefault();
 let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let temperatureElement =  document.querySelector("#temperature");
 temperatureElement.innerHTML= Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
event.preventDefault();
let temperatureElement =  document.querySelector("#temperature");
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

search("Lisbon");