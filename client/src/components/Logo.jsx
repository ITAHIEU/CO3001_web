import React from 'react';
import '../styles/Login.css';
function Logo() {
  return (
    <div className="homepage__logo-container">
      <img src={require('../assets/logo-bk.png')} alt="Logo"  />
    </div>
  );
}

export default Logo;
