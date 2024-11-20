import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS toàn cục cho ứng dụng
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/Homepage'; // Trang chính

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App">
      <HomePage />
    </div>
  </React.StrictMode>
);

// Performance logging (optional)
reportWebVitals(console.log);