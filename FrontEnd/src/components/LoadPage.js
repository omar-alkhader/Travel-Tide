// LoadPage.js
import React, { useEffect } from 'react';

function LoadPage() {

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 3 seconds, navigate to home page
      window.location.href = "";
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light flex-column">
      <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h1 className="mt-4">Welcome to Travel Tide</h1>
      <p className="text-muted">Your adventure begins soon...</p>
    </div>
  );
}

export default LoadPage;
