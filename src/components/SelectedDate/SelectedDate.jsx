import React, { useState, useEffect } from "react";

const SelectedDate = ({ date }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const apiKey = "781b79b4bdf6f5ce702f22f81c87a459"; // Your API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      const filteredData = data.list.filter((item) => {
        const forecastDate = new Date(item.dt * 1000).toDateString();
        return forecastDate === date.toDateString();
      });
      setWeatherData(filteredData); // Store filtered forecast data for the selected date
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      const latitude = 40.6501; // Replace with dynamic values if needed
      const longitude = -73.9496;
      fetchWeatherData(latitude, longitude);
    }
  }, [date]);

  return (
    <div className="selected-date">
      <h2>Selected Date:</h2>
      <p>{date.toDateString()}</p>
      {loading && <p>Loading weather data...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && weatherData.length > 0 && (
        <div>
          <h3>Weather Forecast for {date.toDateString()}:</h3>
          <ul>
            {weatherData.map((item, index) => (
              <li key={index} className="weatherCard">
                <div className="dateWeatherCard">
                  Time: {new Date(item.dt * 1000).toLocaleTimeString()}
                </div>
                <div className="weatherImage">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                </div>
                <div className="weatherInfo">
                  <p>Temperature: {item.main.temp}°F</p>
                  <p>Humidity: {item.main.humidity}%</p>
                  <p>Wind Speed: {item.wind.speed} mph</p>
                  <p>Weather: {item.weather[0].description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {weatherData && weatherData.length === 0 && (
        <p>No forecast data available for the selected date.</p>
      )}
    </div>
  );
};

export default SelectedDate;
