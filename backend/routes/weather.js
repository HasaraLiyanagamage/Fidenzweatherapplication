const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const authMiddleware = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Cache with 5-minute TTL
const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL) || 300 });

// Load cities from JSON file
const getCities = () => {
  try {
    const citiesPath = path.join(__dirname, '../../cities.json');
    const data = fs.readFileSync(citiesPath, 'utf8');
    const citiesData = JSON.parse(data);
    return citiesData.List || [];
  } catch (error) {
    console.error('Error reading cities.json:', error);
    return [];
  }
};

router.get('/cities', authMiddleware, async (req, res) => {
  try {
    const cacheKey = 'all_cities_weather';
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({ data: cachedData, cached: true });
    }

    const cities = getCities();
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const weatherPromises = cities.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          id: city.CityCode,
          appid: apiKey,
          units: 'metric'
        }
      })
      .then(response => ({
        cityCode: city.CityCode,
        cityName: response.data.name,
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        status: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        windSpeed: response.data.wind.speed,
        country: response.data.sys.country,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset
      }))
      .catch(error => {
        console.error(`Error fetching weather for city ${city.CityCode}:`, error.message);
        return null;
      })
    );

    const weatherData = await Promise.all(weatherPromises);
    const validWeatherData = weatherData.filter(data => data !== null);

    
    cache.set(cacheKey, validWeatherData);

    res.json({ data: validWeatherData, cached: false });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get weather for a specific city
router.get('/city/:cityCode', authMiddleware, async (req, res) => {
  try {
    const { cityCode } = req.params;
    const cacheKey = `city_${cityCode}`;

    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({ data: cachedData, cached: true });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        id: cityCode,
        appid: apiKey,
        units: 'metric'
      }
    });

    const weatherData = {
      cityCode: cityCode,
      cityName: response.data.name,
      temp: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      tempMin: response.data.main.temp_min,
      tempMax: response.data.main.temp_max,
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      status: response.data.weather[0].main,
      icon: response.data.weather[0].icon,
      windSpeed: response.data.wind.speed,
      country: response.data.sys.country,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset
    };

    
    cache.set(cacheKey, weatherData);

    res.json({ data: weatherData, cached: false });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
