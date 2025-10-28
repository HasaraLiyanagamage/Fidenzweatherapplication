# API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication

All weather endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Weather API is running"
}
```

---

### 2. Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - All fields are required
- `400` - User already exists
- `500` - Server error

---

### 3. Login

**POST** `/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Email and password are required
- `401` - Invalid credentials
- `500` - Server error

---

### 4. Get All Cities Weather

**GET** `/weather/cities`

Fetch weather data for all cities in cities.json.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "data": [
    {
      "cityCode": "1248991",
      "cityName": "Colombo",
      "temp": 28.5,
      "feelsLike": 32.1,
      "tempMin": 27.0,
      "tempMax": 30.0,
      "pressure": 1012,
      "humidity": 78,
      "description": "scattered clouds",
      "status": "Clouds",
      "icon": "03d",
      "windSpeed": 3.5,
      "country": "LK",
      "sunrise": 1635728400,
      "sunset": 1635771600
    },
    {
      "cityCode": "1850147",
      "cityName": "Tokyo",
      "temp": 15.2,
      "feelsLike": 14.8,
      "tempMin": 13.0,
      "tempMax": 17.0,
      "pressure": 1015,
      "humidity": 65,
      "description": "clear sky",
      "status": "Clear",
      "icon": "01d",
      "windSpeed": 2.1,
      "country": "JP",
      "sunrise": 1635720000,
      "sunset": 1635760800
    }
  ],
  "cached": false
}
```

**Notes:**
- `cached: true` indicates data is served from cache
- Cache expires after 5 minutes (300 seconds)
- Temperature is in Celsius
- Wind speed is in m/s
- Pressure is in hPa

**Error Responses:**
- `401` - Access denied. No token provided
- `401` - Invalid token
- `500` - API key not configured
- `500` - Failed to fetch weather data

---

### 5. Get Single City Weather

**GET** `/weather/city/:cityCode`

Fetch weather data for a specific city.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `cityCode` - The city code (e.g., 1248991 for Colombo)

**Example:**
```
GET /weather/city/1248991
```

**Success Response (200):**
```json
{
  "data": {
    "cityCode": "1248991",
    "cityName": "Colombo",
    "temp": 28.5,
    "feelsLike": 32.1,
    "tempMin": 27.0,
    "tempMax": 30.0,
    "pressure": 1012,
    "humidity": 78,
    "description": "scattered clouds",
    "status": "Clouds",
    "icon": "03d",
    "windSpeed": 3.5,
    "country": "LK",
    "sunrise": 1635728400,
    "sunset": 1635771600
  },
  "cached": false
}
```

**Error Responses:**
- `401` - Access denied. No token provided
- `401` - Invalid token
- `500` - API key not configured
- `500` - Failed to fetch weather data

---

## Weather Status Values

The `status` field can have the following values:
- `Clear` - Clear sky
- `Clouds` - Cloudy
- `Rain` - Rainy
- `Drizzle` - Light rain
- `Thunderstorm` - Thunderstorm
- `Snow` - Snowy
- `Mist` - Misty
- `Smoke` - Smoky
- `Haze` - Hazy
- `Dust` - Dusty
- `Fog` - Foggy
- `Sand` - Sandy
- `Ash` - Volcanic ash
- `Squall` - Squall
- `Tornado` - Tornado

---

## Caching

The API implements a 5-minute cache for weather data to:
1. Reduce API calls to OpenWeatherMap
2. Improve response times
3. Stay within API rate limits

**Cache Behavior:**
- First request fetches fresh data from OpenWeatherMap
- Subsequent requests within 5 minutes return cached data
- After 5 minutes, cache expires and fresh data is fetched
- Each city has its own cache entry

---

## Rate Limiting

OpenWeatherMap free tier limits:
- 60 calls/minute
- 1,000,000 calls/month

The caching system helps stay within these limits.

---

## Error Handling

All errors follow this format:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created (registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication errors)
- `500` - Internal Server Error

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Weather (replace TOKEN with your JWT)
```bash
curl http://localhost:5000/api/weather/cities \
  -H "Authorization: Bearer TOKEN"
```

---

## Testing with Postman

1. **Import Collection:**
   - Create a new collection
   - Add the endpoints above

2. **Set Environment Variables:**
   - `base_url`: http://localhost:5000/api
   - `token`: (will be set after login)

3. **Test Flow:**
   - Register a user
   - Login and save the token
   - Use token to access weather endpoints

---

## Security Notes

- Tokens expire after 24 hours
- Passwords are hashed using bcrypt
- JWT tokens are signed with a secret key
- All weather endpoints require authentication
- Use HTTPS in production
