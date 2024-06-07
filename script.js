// Get references to DOM elements
var temp = document.getElementById('temp');
var cityName = document.getElementById('city');
var humidity = document.getElementById('humidity');
var windspeed = document.getElementById('windspeed');
var searchinput = document.getElementById('searchinput');
var searchbox = document.getElementById('searchbox');
var body_img = document.getElementById('body_img');
var body_data = document.getElementById('body_data');
var details = document.getElementById('details');
var error = document.getElementById('error');

// Function to fetch and display weather data
async function checkWeather(city) {
    let apiKey = '5dae68017fe852fb7d33b93e9bc6fd8a'; // Replace with your actual OpenWeatherMap API key
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        let data = await response.json();

        // Update weather details
        temp.innerHTML = Math.floor(data.main.temp) + '°C';
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        windspeed.innerHTML = data.wind.speed + ' km/h';

        // Update weather image based on weather condition
        let weatherMain = data.weather[0].main;
        if (weatherMain == "Clouds") {
            body_img.src = 'image/cloud.png';
        } else if (weatherMain == 'Clear') {
            body_img.src = 'image/clear.png';
        } else if (weatherMain == 'Rain') {
            body_img.src = 'image/rain.png';
        } else if (weatherMain == 'Drizzle') {
            body_img.src = 'image/drizzle.png';
        } else if (weatherMain == 'Mist') {
            body_img.src = 'image/mist.png';
        } else if (weatherMain == 'Haze') {
            body_img.src = 'image/haze.png';
        }

        // Display weather data and details
        body_data.style.display = 'flex';
        details.style.display = 'flex';
        error.style.display = 'none';
    } catch (err) {
        // Display error message
        error.innerHTML = err.message;
        error.style.display = 'block';
        body_data.style.display = 'none';
        details.style.display = 'none';
    }
}

// Add event listener to the search box
searchbox.addEventListener('click', () => {
    let cityIn = searchinput.value;
    checkWeather(cityIn);
});
