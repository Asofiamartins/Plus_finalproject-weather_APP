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

function displayWeather(response){
    let cityName = document.querySelector("#city");
    let temperatureValue = document.querySelector("#temperature");
    let weatherDescription = document.querySelector("#currentDescription");
    let humidityValue =document.querySelector("#humidity");
    let windValue = document.querySelector("#wind");
    cityName.innerHTML= response.data.name;
    temperatureValue.innerHTML= Math.round(response.data.main.temp);
    weatherDescription.innerHTML= response.data.weather[0].description;
    humidityValue.innerHTML= Math.round(response.data.main.humidity);
    windValue.innerHTML= Math.round(response.data.wind.speed);

    let currentDate = document.querySelector("#currenTime");
    currentDate.innerHTML = formatDate(response.data.dt * 1000);

    console.log(response.data);
}







let apiKey = "e49f4dac5b0d3a8c77d299a55302727f";
let city = "London"
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;




axios.get(apiUrl).then(displayWeather);