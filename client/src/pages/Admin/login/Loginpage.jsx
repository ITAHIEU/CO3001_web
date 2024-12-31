import React, { useState } from 'react';
import LoginInput from '../../../components/login/LoginInput';
import LoginBtn from '../../../components/login/LoginBtn';
import './Loginpage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State để lưu lỗi nếu có
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        // Gọi API đăng nhập
        const response = await axios.post('http://localhost:5000/admin/login', {
          email: username,
          password: password,
        });

        // Kiểm tra phản hồi từ API
        if (response.data && response.data.message === 'Login successful') {
          localStorage.setItem('user', JSON.stringify(response.data.user));

          alert(`Welcome, ${username}!`);

          setError(''); // Xóa lỗi nếu đăng nhập thành công
          navigate('/Ad-main-page')
        } else {
          setError('Invalid username or password.');
        }
      } catch (error) {
        // Xử lý lỗi từ API hoặc lỗi mạng
        setError(error.response?.data?.message || 'An error occurred while logging in.');
      }
    } else {
      setError('Please fill in both fields.');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setError(''); // Xóa lỗi nếu nhấn Clear
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
          {error && <p className="loginpage__error">{error}</p>} {/* Hiển thị lỗi nếu có */}
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
            <LoginBtn
              label="Login"
              onClick={handleLogin}
              className="LoginButton primary"
              // path={'/Ad-main-page'}
            />
            <LoginBtn
              label="Clear all"
              onClick={handleClear}
              className="LoginButton danger"
            />
          </div>
          <a href="/forgot-password" className="loginpage__forgetpass">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
