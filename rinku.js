const apiKey = "e44b7c2b2c6381cbe3cae265382945b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon based on weather condition
        switch (data.weather[0].main) {
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
          // default:
          //       weatherIcon.src = "img/default.png"; // Add a default icon or handle other cases -->
                break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"; // Hide error message on successful fetch
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".weather").style.display = "none"; // Hide weather details on error
        document.querySelector(".error").style.display = "block"; // Display error message
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});