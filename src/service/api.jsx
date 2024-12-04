const baseUrl = "https://api.openweathermap.org/data/2.5";
const apiKey = "0291bad3b54f2529c4c9ddb5cdfb3b0b"; // Your API key



export const fetchWeatherByCity = async (city) => {
  try {
    const url = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    const data = await response.json();
    return {
      name: data.name,
      id: data.weather[0].id,
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temperature: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error("Error fetching current weather data:", error.message);
    throw error;
  }
};



export const fetchHourlyForecast = async (lat, lon) => {
  try {
    const url = `${baseUrl}/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch hourly forecast data");
    }
    const data = await response.json();

    // Process hourly data to extract only required fields
    const forecastData = data.list.map((entry) => ({
      icon: entry.weather[0].icon,
      temp: entry.main.temp,
      day: new Date(entry.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      }), 
      // Convert timestamp to day of the week
    }));

    return forecastData;
  } catch (error) {
    console.error("Error fetching hourly forecast data:", error.message);
    throw error;
  }
};
