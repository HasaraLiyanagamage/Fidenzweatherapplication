import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherDashboard from './components/WeatherDashboard';
import LoginPage from './components/LoginPage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <WeatherDashboard />
      )}
    </div>
  );
}

export default App;
