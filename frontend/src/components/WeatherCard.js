import React from 'react';
import { Droplets, Wind, Gauge, Thermometer } from 'lucide-react';
import './WeatherCard.css';

function WeatherCard({ data }) {
  const getWeatherIcon = (status) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return iconMap[status] || '🌤️';
  };

  const getWeatherGradient = (status) => {
    const gradientMap = {
      'Clear': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      'Clouds': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      'Rain': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Drizzle': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      'Thunderstorm': 'linear-gradient(135deg, #434343 0%, #000000 100%)',
      'Snow': 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      'Mist': 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)',
      'Fog': 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)'
    };
    return gradientMap[status] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <div 
      className="weather-card"
      style={{ background: getWeatherGradient(data.status) }}
    >
      <div className="weather-card-header">
        <div className="city-info">
          <h2>{data.cityName}</h2>
          <span className="country-badge">{data.country}</span>
        </div>
        <div className="weather-icon-large">
          {getWeatherIcon(data.status)}
        </div>
      </div>

      <div className="temperature-section">
        <div className="main-temp">
          <span className="temp-value">{Math.round(data.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-description">
          {data.description}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Thermometer size={18} />
          <div className="detail-content">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(data.feelsLike)}°C</span>
          </div>
        </div>

        <div className="detail-item">
          <Droplets size={18} />
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <Wind size={18} />
          <div className="detail-content">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{data.windSpeed} m/s</span>
          </div>
        </div>

        <div className="detail-item">
          <Gauge size={18} />
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{data.pressure} hPa</span>
          </div>
        </div>
      </div>

      <div className="temp-range">
        <div className="temp-range-item">
          <span className="range-label">Min</span>
          <span className="range-value">{Math.round(data.tempMin)}°C</span>
        </div>
        <div className="temp-range-divider"></div>
        <div className="temp-range-item">
          <span className="range-label">Max</span>
          <span className="range-value">{Math.round(data.tempMax)}°C</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
