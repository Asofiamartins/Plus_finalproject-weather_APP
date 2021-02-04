//this function is for last updated date in weatherApi
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

function displayForecast(response) {
console.log(response.data);

}


// this function shows weather on default city
function search(city){
let apiKey = "e49f4dac5b0d3a8c77d299a55302727f";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather); 


let apiUrl= `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

//function when user search the city
function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

// function for current city -> uses coords
function showPosition(position) {
  let apiKey = "e49f4dac5b0d3a8c77d299a55302727f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather); 
}
// funtion to get current coords
function getPosition(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(showPosition)
}


//functions to convert units 
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

//Search Bar
let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);


let currentButton = document.querySelector("#currentcity-button");
currentButton.addEventListener("click",getPosition);
search("Lisbon");