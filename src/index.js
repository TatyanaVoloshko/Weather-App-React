function formatDate(date) {
    let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
    
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }   
       
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    
    return `${day} ${hours}:${minutes}`;
}




let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

        
let form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
       


function displayWeatherCondition(response) {
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;

    celsiusTemperature = response.data.main.temp;

    document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;
    document.querySelector("#wind").innerHTML =
    response.data.wind.speed;
    let iconElement = document.querySelector("#icon")
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "794b84783e9d181bfed9b6145a7885c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName").value;
  searchCity(city);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Simferopol");
displayForecast();

