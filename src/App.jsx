import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { WiHumidity, WiStrongWind } from "react-icons/wi"; 
import { FaMapMarkerAlt } from "react-icons/fa"; 

const API_KEY = "329a115ed2516c35cc5dcd70d8b5303b"; 

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const MapIcon = FaMapMarkerAlt;
  const HumidityIcon = WiHumidity;
  const WindIcon = WiStrongWind;

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h2>Path2Tech Weather App</h2>
      <h4>Find Weather of a City</h4>
      <div className="input-group">
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <div className="weather-info">
            <p className="temperature">{Math.round(Number(weather.main.temp) * (9/5)) + 32}°F</p>
            <p className="description">| {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
          <h3>
            {weather.name}, US
          </h3>
          <h4>Weather Details</h4>
          <div className="extra-info">
            <p>
              <HumidityIcon /> {weather.main.humidity}%
            </p>
            <p>
              <WindIcon /> {weather.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;