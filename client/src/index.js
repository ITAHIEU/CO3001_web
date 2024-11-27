import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS toàn cục cho ứng dụng
import reportWebVitals from './reportWebVitals';
// import HomePage from './pages/login/Homepage'; // Trang chính
import Loginpage from './pages/login/Loginpage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App">
      {/* <HomePage /> */}
      <Loginpage />
    </div>
  </React.StrictMode>
);

// Performance logging (optional)
reportWebVitals(console.log);