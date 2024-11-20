import React from 'react';
import Logo from '../components/Logo';
import UserCard from '../components/UserCard';
import '../styles/Login.css';

import icon from '../assets/icon.svg';

function HomePage() {
  return (
    <div className="homepage">
      <Logo />
      <div className="homepage__user-selection">
        <UserCard label="ADMIN" icon={icon} />
        <UserCard label="USER" icon={icon} />
      </div>
    </div>
  );
}

export default HomePage;
