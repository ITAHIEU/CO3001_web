import React from 'react';
import Logo from '../../components/login/Logo';
import UserCard from '../../components/login/UserCard';
import styles from './Homepage.module.css'; // Import đúng cách
import icon from '../../assets/icon.svg';

function HomePage() {
  return (
    <div className={styles.homepage}>
      <Logo />
      <div className={styles.homepage__userSelection}>
        <UserCard label="ADMIN" icon={icon} />
        <UserCard label="USER" icon={icon} />
      </div>
    </div>
  );
}

export default HomePage;
