import React from 'react';
import styles from './UserCard.module.css'; 
import { Link } from 'react-router-dom';
function UserCard({ label, icon, path }) {
  return (
    <Link to={path}>
      <div className={styles.homepage__usercard}> 
        <img src={icon} alt={label} className={styles.usercard__icon} />
        <div className={styles.usercard__label}>{label}</div>
      </div>
    </Link>
  );
}

export default UserCard;
