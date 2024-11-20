import React from 'react';

function UserCard({ label, icon }) {
  return (
    <div className="homepage__usercard">
      <img src={icon} alt={label} className="usercard__icon" />
      <div className="usercard__label">{label}</div>
    </div>
  );
}

export default UserCard;
