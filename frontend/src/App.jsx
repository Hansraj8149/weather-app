import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/Weather';
import Forecast from './components/Forecast';

function App() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null)

  const [isCelsius, setIsCelsius] = useState(true); // State to track temperature unit

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };
  const fetchData = async () => {
    try {
      

         
          const response = await fetch(`http://localhost:3001/weather?city=${city}`);
        const weatherData = await response.json();
        console.log(weatherData)
        setWeather(weatherData);
         
      const forecastResponse = await fetch(`http://localhost:3001/forecast?city=${city}`);
      const forecastData = await forecastResponse.json();

      const groupedData = groupForecastByDay(forecastData.list);

      console.log(forecastData.list)
      setForecast(groupedData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const groupForecastByDay = (forecastList) => {
    const groupedForecast = {};
    forecastList.forEach((forecastItem) => {
      const date = new Date(forecastItem.dt * 1000).toLocaleDateString();
      if (!groupedForecast[date]) {
        groupedForecast[date] = [];
      }
      groupedForecast[date].push(forecastItem);
    });

    console.log(groupedForecast)
    return groupedForecast;
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1 className="text-center mb-4">Weather App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={fetchData}
          >
            Get Weather
          </button>
        </div>


        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={toggleTemperatureUnit}>
            Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>


        {weather && <Weather weather = {weather} isCelsius={isCelsius}/>}

        {forecast && (
          <div className='mt-4'>
            <h3 className='text-center mb-3'>5-Day Forecast</h3>
            {Object.entries(forecast).map(([date,forecasts])=> (
              <Forecast key = {date} date = {date} forecasts={forecasts} isCelsius={isCelsius}/>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
