import React from 'react';
import './LoginBtn.css'; 

const LoginBtn = ({ label, onClick, className, type = 'button' }) => {
    return (
      <button className="LoginButton" onClick={onClick} type={type}>
        {label}
      </button>
    );
  };
  
export default LoginBtn; 

