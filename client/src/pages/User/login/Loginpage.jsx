import React, { useState } from 'react';
import LoginInput from '../../../components/login/LoginInput';
import LoginBtn from '../../../components/login/LoginBtn';
import './Loginpage.css';

const UserLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      alert(`Welcome, ${username}!`);
    } else {
      alert('Please fill in both fields.');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div className="loginpage">
      <div className="loginpage__header">
        <div className="loginpage__logo">
          <img src={require('../../../assets/logo-bk.png')} alt="Logo-bk" />
        </div>
        <h1>Central Authentication Service</h1>
      </div>
      <div className="Login_background">
        <div className="loginpage__auth-section">
          <h2>Enter your Username and Password</h2>
          <div className="loginpage__input-group">
            <LoginInput
              label="Username"
              value={username}
              onChange={setUsername}
            />
            <LoginInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <div className="loginpage__buttons">
            <LoginBtn label="Login" onClick={handleLogin} className="LoginButton primary" path={"/mainPage"}/>
            <LoginBtn label="Clear all" onClick={handleClear} className="LoginButton danger" />
          </div>
            <a href="/forgot-password" className="loginpage__forgetpass">
              Forgot your password?
            </a>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
