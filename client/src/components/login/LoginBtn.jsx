import React from 'react';
import './LoginBtn.css'; 
import { Link } from 'react-router-dom';
const LoginBtn = ({ label, onClick, className, type = 'button', path }) => {
    return (
      <Link to={path}>      
        <button className="LoginButton" onClick={onClick} type={type}>
          {label}
        </button>
    </Link>
    );
  };
  
export default LoginBtn; 

