import React from 'react';
import { RefreshCw } from 'lucide-react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <RefreshCw size={48} className="spinning" />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
