import React from 'react';
import './LoginInput.module.css';

const LoginInput = ({ label, type = 'text', value, onChange }) => {
  return (
    <div className="Login_input">
      <label className="Login_input__label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="Login_input__box"
        placeholder={label}
      />
    </div>
  );
};

export default LoginInput;
