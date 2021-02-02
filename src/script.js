function displayWeather(response){
    console.log(response.data);
let temperatureValue = ``;

}







let apiKey = "e49f4dac5b0d3a8c77d299a55302727f";
let city = "London"
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;




axios.get(apiUrl).then(displayWeather);