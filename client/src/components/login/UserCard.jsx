import React from 'react';
import styles from './UserCard.module.css'; 

function UserCard({ label, icon }) {
  return (
    <div className={styles.homepage__usercard}> 
      <img src={icon} alt={label} className={styles.usercard__icon} />
      <div className={styles.usercard__label}>{label}</div>
    </div>
  );
}

export default UserCard;
