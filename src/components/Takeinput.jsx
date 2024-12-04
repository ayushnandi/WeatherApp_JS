import axios from "axios";
import React, { useState } from "react";

export default function Takeinput({ city, setCity, data, setData }) {
  const [error, setError] = useState(""); // Store error messages

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=d353c25be5ce55866da7015e671184b4`;

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors

    if (!city) {
      setError("City name cannot be empty.");
      return;
    }

    try {
      const response = await axios.get(url);
      if (response.data && response.data.length > 0) {
        console.log("data : ", data)
        const newCityData = response.data[0]; // Take the first matching result
        const { lat, lon } = newCityData; // Extract latitude and longitude
        setData({ lat, lon }); // Update lat and lon in App state
        setCity(""); // Clear input field
      } else {
        setError("No results found for the entered city.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching the data. Please try again.");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter city name..."
        onChange={(event) => setCity(event.target.value)}
        value={city}
        id="location"
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error */}
    </form>
  );
}
