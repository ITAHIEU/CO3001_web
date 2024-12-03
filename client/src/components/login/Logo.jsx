import React from 'react';
import styles from './Logo.module.css'; // Import CSS Modules

function Logo() {
  return (
    <div className={styles.homepage__logo_container}> 
      <img
        src={require('../../assets/logo-bk.png')}
        alt="Logo"
        className={styles.homepage__imagine} 
      />
    </div>
  );
}

export default Logo;
