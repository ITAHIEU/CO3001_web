import React from 'react';
import './LoginBtn.module.css'; 

const LoginBtn = ({ label, onClick, className, type = 'button' }) => {
    return (
      <button className="LoginButton" onClick={onClick} type={type}>
        {label}
      </button>
    );
  };
  
export default LoginBtn; 

