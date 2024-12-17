let weather = {
  apiKey: "d02fae48c58039c44ebbe0c5aea65788", // Replace with your valid API key
  
    // Fetch Weather Data from OpenWeatherMap API
    fetchWeather: function (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found or invalid API key.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
          alert(error.message);
        });
    },
  
    // Display Weather Data in the DOM
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText =
        description.charAt(0).toUpperCase() + description.slice(1);
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").style.visibility = "visible"; // Make the weather info visible
    },
  
    // Search for Weather when user inputs city
    search: function () {
      const city = document.querySelector(".search-bar").value.trim();
      if (city) {
        this.fetchWeather(city);
      } else {
        alert("Please enter a valid city name.");
      }
    },
  };
  
  // Add Event Listeners for Search Button and Enter Key
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
  