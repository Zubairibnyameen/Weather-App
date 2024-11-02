const apiKey = '592ddf60600ca924e40567dbe84c3100';

        // Function to fetch weather by user input
        function fetchWeatherByInput() {
            const location = document.getElementById('location-input').value;
            if (!location) {
                displayError('Please enter a location.');
                return;
            }
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
            fetchWeather(url);
        }

        // Function to fetch weather using geolocation
        function fetchWeatherByGeolocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                    fetchWeather(url);
                }, () => displayError('Geolocation permission denied.'));
            } else {
                displayError('Geolocation is not supported by this browser.');
            }
        }

        // Function to fetch and display weather data
        function fetchWeather(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod !== 200) {
                        displayError(data.message);
                    } else {
                        displayWeather(data);
                    }
                })
                .catch(() => displayError('Failed to fetch data. Please try again.'));
        }

        // Function to display weather data
        function displayWeather(data) {
            const weatherInfo = document.getElementById('weather-info');
            const { name } = data;
            const { temp } = data.main;
            const { description } = data.weather[0];
            const { humidity } = data.main;
            const { speed } = data.wind;
            const fahrenheit = (temp * 9/5 + 32).toFixed(2);

            weatherInfo.innerHTML = `
                <h3>Weather in ${name}</h3>
                <p>Temperature: ${temp} °C / ${fahrenheit} °F</p>
                <p>Condition: ${description}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${speed} m/s</p>
            `;
            document.getElementById('error').innerHTML = '';
        }

        // Function to display error messages
        function displayError(message) {
            document.getElementById('error').innerHTML = `<p style="color: red;">${message}</p>`;
            document.getElementById('weather-info').innerHTML = '';
        }      
        
        
        
        
        
        
    