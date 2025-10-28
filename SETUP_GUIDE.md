# Quick Setup Guide

> **📘 For detailed Auth0 configuration, see [AUTH0_SETUP_GUIDE.md](./AUTH0_SETUP_GUIDE.md)**

## Step 1: Set Up Auth0

1. Create Auth0 account at https://auth0.com/
2. Create an API (Identifier: `https://weather-api`)
3. Create a Single Page Application
4. Enable Email MFA
5. Disable public signups
6. Create test user: `careers@fidenz.com` / `Pass#fidenz`

**Save these values:**
- Auth0 Domain (e.g., `your-tenant.auth0.com`)
- Client ID
- API Identifier

## Step 2: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 3: Configure Environment Variables

### Backend `.env` file

Create `.env` in the `backend` directory:

```env
PORT=5001
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
CACHE_TTL=300

# Auth0 Configuration
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://weather-api
```

### Frontend `.env` file

Create `.env` in the `frontend` directory:

```env
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your_client_id_here
REACT_APP_AUTH0_AUDIENCE=https://weather-api
```

**Important:**
- Get your OpenWeatherMap API key from: https://openweathermap.org/api
- Replace Auth0 values with your actual credentials from Auth0 Dashboard

## Step 4: Run the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
```
Backend will run on http://localhost:5001

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

## Step 5: Use the Application

1. Open http://localhost:3000 in your browser
2. Click "Sign In with Auth0"
3. Login with test credentials:
   - Email: `careers@fidenz.com`
   - Password: `Pass#fidenz`
4. Complete MFA verification (check email)
5. View weather information for all cities

## Troubleshooting

### Auth0 Issues

**"Callback URL mismatch"**
- Add `http://localhost:3000` to Allowed Callback URLs in Auth0

**"Invalid audience"**
- Verify AUTH0_AUDIENCE matches in both backend and frontend .env files

**MFA not working**
- Ensure Email MFA is enabled in Auth0 Dashboard
- Verify user's email is verified in Auth0

### API Issues

**"API key not configured"**
- Make sure you created the `.env` file in the backend directory
- Verify your OpenWeatherMap API key is correct
- Restart the backend server after adding the API key

**Frontend can't connect to backend**
- Ensure backend is running on port 5001
- Check that both servers are running simultaneously
- Verify proxy setting in frontend package.json points to port 5001
