import React, { useEffect, useState } from "react";
import Displaytemp from "./components/Displaytemp";
import Takeinput from "./components/takeinput";
import CityName from "./components/CityName";
import DailyForecast from "./components/DailyForecast";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null); // Stores latitude and longitude
  const [weatherData, setWeatherData] = useState(null); // Stores fetched weather data

  const fetchWeatherData = async (lat, lon) => {
    try {
      const apiKey = "d353c25be5ce55866da7015e671184b4";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const response = await fetch(url);
      const weatherResponse = await response.json();
      setWeatherData(weatherResponse);
      console.log("Weather data : ", weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setData({ lat: latitude, lon: longitude }); // Set initial location
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Optionally set a fallback location
          setData({ lat: 28.6139, lon: 77.209 }); // Default to New Delhi, India
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setData({ lat: 28.6139, lon: 77.209 }); // Fallback location
    }
  };

  // Fetch weather data whenever latitude/longitude (data) changes
  useEffect(() => {
    if (data && data.lat && data.lon) {
      fetchWeatherData(data.lat, data.lon);
    }
  }, [data]);

  // Set default location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="main">
      <div className="layout flex"></div>

      <div className="top-row flex justify-around">
        <div className="cityName">
          <CityName
            name={weatherData?.city?.name} // Pass city name
            country={weatherData?.city?.country} // Pass country
          />
        </div>
        <div>
          <Takeinput
            city={city}
            setCity={setCity}
            data={data}
            setData={(newData) => setData(newData)} // Pass updated lat/lon here
          />
        </div>
        <div className="dailyforecast">
          {data && data.lat && data.lon ? (
            <DailyForecast lat={data.lat} lon={data.lon} />
          ) : (
            <p>Loading daily forecast...</p>
          )}
        </div>
      </div>
      <Displaytemp weatherData={weatherData} />
    </div>
  );
}

export default App;
