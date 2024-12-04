import React, { useEffect, useState } from "react";

export default function DailyForecast({ lat, lon }) {
  const [dailyForecast, setDailyForecast] = useState(null);
  const apiKey = "d353c25be5ce55866da7015e671184b4";

  const fetchDailyForecast = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}`;
      const response = await fetch(url);
      const dailyWeather = await response.json();
      console.log("Daily data is here : "+ dailyForecast);
      // setDailyForecast(dailyWeather);
    } catch (error) {
      console.error("Error fetching daily forecast data:", error);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchDailyForecast();
    }
  }, [lat, lon]);

  if (!dailyForecast) {
    return <p>Loading daily forecast...</p>;
  }

  return (
    <div className="daily-forecast">
      <h2>7-Day Weather Forecast</h2>
      <ul>
        {dailyForecast.list.map((day, index) => (
          <li key={index} className="forecast-item">
            {/* <p><strong>Day {index + 1}</strong></p>
            <p>Temperature: {day.temp.day}°C</p>
            <p>Min: {day.temp.min}°C, Max: {day.temp.max}°C</p>
            <p>Weather: {day.weather[0].description}</p>
            <p>Humidity: {day.humidity}%</p>
            <p>Wind Speed: {day.speed} m/s</p>
            <p>Rain: {day.rain ? `${day.rain} mm` : "No rain"}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
