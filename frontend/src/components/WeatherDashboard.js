import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, RefreshCw, Cloud, Eye, Shield } from 'lucide-react';
import WeatherCard from './WeatherCard';
import './WeatherDashboard.css';

function WeatherDashboard() {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCached, setIsCached] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get('/api/weather/cities', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWeatherData(response.data.data);
      setIsCached(response.data.cached);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => logout({ logoutParams: { returnTo: window.location.origin } }), 2000);
      } else {
        setError(err.response?.data?.error || 'Failed to fetch weather data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <Cloud className="header-icon" size={32} />
            <div>
              <h1>Weather Dashboard</h1>
              <p>Welcome, {user?.name || user?.email}!</p>
            </div>
          </div>
          <div className="header-right">
            <button 
              onClick={fetchWeatherData} 
              className="refresh-button"
              disabled={loading}
              title="Refresh weather data"
            >
              <RefreshCw size={20} className={loading ? 'spinning' : ''} />
            </button>
            <button 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} 
              className="logout-button"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
        <div className="auth-info">
          <Shield size={16} />
          <span>Secured with Auth0 {user?.email_verified && '• Email Verified'}</span>
        </div>
        {isCached && (
          <div className="cache-indicator">
            <Eye size={16} />
            Showing cached data (refreshes every 5 minutes)
          </div>
        )}
      </header>

      <main className="dashboard-main">
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading && weatherData.length === 0 ? (
          <div className="loading-container">
            <RefreshCw size={48} className="spinning" />
            <p>Loading weather data...</p>
          </div>
        ) : (
          <div className="weather-grid">
            {weatherData.map((city) => (
              <WeatherCard key={city.cityCode} data={city} />
            ))}
          </div>
        )}

        {!loading && weatherData.length === 0 && !error && (
          <div className="empty-state">
            <Cloud size={64} />
            <p>No weather data available</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default WeatherDashboard;
