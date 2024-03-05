import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Forecast = ({date,forecasts,isCelsius}) => {
    const unit = isCelsius ? '°C' : '°F';

    return (
        <div className="card mb-4">
            <h5 className="card-header">{date}</h5>
          <div className="card-body">
            <div className="row">
              {forecasts.map((forecastItem) => (
                <div key={forecastItem.dt} className="col-md-12 mb-3">
                  <div className="card text-center">
                      <h6 className="card-header mb-2 text-muted">
                        Time: {new Date(forecastItem.dt * 1000).toLocaleTimeString()}
                      </h6>
                    <div className="card-body ">
                      <p className="card-text">Temperature: {isCelsius
      ? forecastItem.main.temp
      : (forecastItem.main.temp * 9) / 5 + 32}&nbsp;{unit}</p>
                      <p className="card-text">Description: {forecastItem.weather[0].description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Forecast
