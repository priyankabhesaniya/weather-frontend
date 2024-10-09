import React from 'react';
// import './Weather.css'; // Ensure to import the CSS file

const Weather = ({ weatherData, isCelsius, convertTemp }) => {
  return (
    <>
    {
        weatherData ? (

    <div className="weather-card">
      <div className="header">
        <h2 className="location">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        {/* <Button className='btn btn-success' onClick={()=>{navigate('/forecast')}}>View 7Day forecast</Button> */}
      </div>
      <div className="temperature-section">
        <div className="temperature">
          {convertTemp(weatherData.main.temp).toFixed(1)}°{isCelsius ? 'C' : 'F'}
        </div>
        <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="icon"
          />
          <p className="weather-description">{weatherData.weather[0].description}</p>
        </div>
      </div>
      <div className="info-grid">
        <div className="info-item">Feels like: {convertTemp(weatherData.main.feels_like).toFixed(1)}°{isCelsius ? 'C' : 'F'}</div>
        <div className="info-item">Humidity: {weatherData.main.humidity}%</div>
        <div className="info-item">Wind: {weatherData.wind.speed} m/s</div>
        <div className="info-item">Pressure: {weatherData.main.pressure} hPa</div>
      </div>
    </div>
        ):(<p>No data found</p>)
    }
    </>
  );
};

export default Weather;
