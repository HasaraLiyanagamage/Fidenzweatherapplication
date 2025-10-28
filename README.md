# Weather Application with Authentication

A full-stack weather application that displays real-time weather information for multiple cities with secure authentication and authorization.

## 🌟 Features

### Part 1: Weather Information Web/API Application
- Reads city codes from `cities.json` file
- Fetches real-time weather data from OpenWeatherMap API
- Displays comprehensive weather information including:
  - Temperature (current, min, max, feels like)
  - Weather conditions and description
  - Humidity, wind speed, and pressure
  - Country information
- Responsive UI design (desktop and mobile)
- Data caching with 5-minute expiration
- Auto-refresh functionality

### Part 2: Authentication & Authorization
- User registration with validation
- Secure login system
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Session management

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Auth0** - Authentication & Authorization
- **express-oauth2-jwt-bearer** - JWT validation
- **axios** - HTTP client
- **node-cache** - In-memory caching
- **dotenv** - Environment variables

### Frontend
- **React** - UI framework
- **Auth0 React SDK** - Authentication integration
- **Lucide React** - Modern icons
- **Axios** - API requests
- **CSS3** - Styling with gradients and animations

## Project Structure

```
Fidenz/
├── backend/
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── weather.js        # Weather API routes
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Main server file
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.css
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── WeatherCard.css
│   │   │   ├── WeatherCard.js
│   │   │   ├── WeatherDashboard.css
│   │   │   └── WeatherDashboard.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
├── cities.json               # City data file
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Auth0 account (free tier)
- OpenWeatherMap API key

### Installation

> **📘 For detailed Auth0 setup instructions, see [AUTH0_SETUP_GUIDE.md](./AUTH0_SETUP_GUIDE.md)**

#### 1. Set Up Auth0

1. Create an Auth0 account at https://auth0.com/
2. Create an API in Auth0 Dashboard
3. Create a Single Page Application
4. Enable Email MFA
5. Disable public signups
6. Create test user: `careers@fidenz.com` / `Pass#fidenz`

See [AUTH0_SETUP_GUIDE.md](./AUTH0_SETUP_GUIDE.md) for step-by-step instructions.

#### 2. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

Edit `.env` file with your credentials:
```env
PORT=5001
OPENWEATHER_API_KEY=your_api_key_here
CACHE_TTL=300

# Auth0 Configuration
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier
```

#### 4. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your_client_id_here
REACT_APP_AUTH0_AUDIENCE=https://your-api-identifier
```

### Running the Application

#### Start Backend Server

```bash
# From backend directory
cd backend
npm start

# For development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5001`

#### Start Frontend Application

```bash
# From frontend directory (in a new terminal)
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

## API Documentation

### Authentication

Authentication is handled by **Auth0**. The frontend automatically manages login/logout and token retrieval.

**Test Credentials:**
- Email: `careers@fidenz.com`
- Password: `Pass#fidenz`

All API endpoints require a valid Auth0 JWT token in the Authorization header.

### Weather Endpoints (Protected)

#### Get All Cities Weather
```
GET /api/weather/cities
Authorization: Bearer {token}

Response:
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
    }
  ],
  "cached": false
}
```

#### Get Single City Weather
```
GET /api/weather/city/:cityCode
Authorization: Bearer {token}

Response:
{
  "data": {
    "cityCode": "1248991",
    "cityName": "Colombo",
    ...
  },
  "cached": false
}
```

## Features Showcase

### Responsive Design
- **Desktop**: Multi-column grid layout with detailed weather cards
- **Tablet**: Adaptive grid that adjusts to screen size
- **Mobile**: Single-column layout optimized for small screens

### Weather Cards
- Dynamic color gradients based on weather conditions
- Weather-specific emoji icons
- Comprehensive weather metrics
- Smooth hover animations

### Caching System
- 5-minute cache expiration
- Cache indicator in UI
- Automatic refresh every 5 minutes
- Manual refresh button

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- Session management
- Token expiration (24 hours)

## Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000                          # Server port
OPENWEATHER_API_KEY=your_key       # OpenWeatherMap API key
JWT_SECRET=your_secret             # JWT signing secret
CACHE_TTL=300                      # Cache time-to-live in seconds
```

### Cities Configuration

Edit `cities.json` to add or modify cities:
```json
{
  "List": [
    {
      "CityCode": "1248991",
      "CityName": "Colombo"
    }
  ]
}
```

Find city codes at [OpenWeatherMap City List](https://bulk.openweathermap.org/sample/)

## Testing

### Manual Testing Steps

1. **Registration**
   - Navigate to the application
   - Click "Sign up"
   - Fill in username, email, and password
   - Verify successful registration and auto-login

2. **Login**
   - Click "Sign in"
   - Enter credentials
   - Verify successful login and redirect to dashboard

3. **Weather Display**
   - Verify all cities are displayed
   - Check weather information accuracy
   - Test responsive layout on different screen sizes

4. **Caching**
   - Note the cache indicator
   - Refresh the page within 5 minutes
   - Verify "cached" indicator appears

5. **Auto-refresh**
   - Wait for 5 minutes
   - Verify automatic data refresh

6. **Logout**
   - Click logout button
   - Verify redirect to login page

## Troubleshooting

### Common Issues

**Issue: "API key not configured"**
- Solution: Ensure `OPENWEATHER_API_KEY` is set in backend `.env` file

**Issue: "Failed to fetch weather data"**
- Solution: Check internet connection and API key validity
- Verify OpenWeatherMap API key is active (may take a few hours after registration)

**Issue: "Invalid token" or "Access denied"**
- Solution: Login again to get a fresh token
- Check if JWT_SECRET is set in backend `.env`

**Issue: Frontend can't connect to backend**
- Solution: Ensure backend is running on port 5000
- Check proxy setting in frontend `package.json`

## Development Notes

### In-Memory Storage
- Current implementation uses in-memory storage for users
- For production, replace with a database (MongoDB, PostgreSQL, etc.)

### Cache Implementation
- Uses `node-cache` for in-memory caching
- Consider Redis for production environments with multiple servers

### Security Considerations
- Store JWT_SECRET securely
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Consider implementing refresh tokens

## Assignment Completion Checklist

### Part 1: Weather Information Web/API Application 
- Read city codes from JSON file
- Fetch weather data from OpenWeatherMap API
- Display weather information
- Responsive UI (desktop and mobile)
- Data caching with 5-minute expiration

### Part 2: Authentication & Authorization 
- Auth0 Integration
- Secure login with Auth0
- Multi-Factor Authentication (MFA) via Email
- Disabled public signups
- Pre-registered test account (careers@fidenz.com)
- JWT token validation
- Protected API routes

## License

This project is created as part of the Fidenz Full Stack Assignment.

{{ ... }}

Created for Fidenz Technologies recruitment process.

## Acknowledgments

- OpenWeatherMap for weather data API
- Lucide React for beautiful icons
- React community for excellent documentation
