import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn, Cloud, Shield } from 'lucide-react';
import './Auth.css';

function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Cloud className="auth-icon" size={48} />
          <h1>Weather Dashboard</h1>
          <p>Secure weather information with Auth0</p>
        </div>

        <div className="auth-features">
          <div className="feature-item">
            <Shield size={20} />
            <span>Multi-Factor Authentication</span>
          </div>
          <div className="feature-item">
            <LogIn size={20} />
            <span>Secure Login with Auth0</span>
          </div>
        </div>

        <button 
          onClick={() => loginWithRedirect()} 
          className="auth-button"
        >
          <LogIn size={20} />
          Sign In with Auth0
        </button>

        <div className="auth-footer">
          <p className="test-credentials">
            <strong>Test Account:</strong><br />
            Email: careers@fidenz.com<br />
            Password: Pass#fidenz
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
