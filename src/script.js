

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

console.log(response.data);
}







let apiKey = "e49f4dac5b0d3a8c77d299a55302727f";
let city = "London"
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;




axios.get(apiUrl).then(displayWeather);