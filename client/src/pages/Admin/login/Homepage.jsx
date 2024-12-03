import React from 'react';
import Logo from '../../../components/login/Logo'
import UserCard from '../../../components/login/UserCard';
import styles from './Homepage.module.css'; 
import icon from '../../../assets/icon.svg'

function UserLoginHomePage() {
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__userSelection}>
        <Logo />
        <div>
          <UserCard label="ADMIN" icon={icon} path={'/admin-login'}/>
          <UserCard label="USER" icon={icon} path={'user-login'}/>
        </div>
      </div>
    </div>
  );
}

export default UserLoginHomePage;