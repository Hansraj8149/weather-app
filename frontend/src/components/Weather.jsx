import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = ({weather, isCelsius}) => {
    const unit = isCelsius ? '°C' : '°F';
    const temperature = isCelsius
      ? weather.main.temp
      : (weather.main.temp * 9) / 5 + 32;
  
    return (
        <div>
          <h2 className="text-center mb-2">{weather.name}</h2>
          <p className="mb-1">Temperature: {temperature}&nbsp;{unit}</p>
          <p className="mb-1">Description: {weather.weather[0].description}</p>
        </div>
      );
    };




export default Weather
