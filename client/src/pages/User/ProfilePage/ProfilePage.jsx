import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className="material-symbols-outlined">account_circle</span>
          <ul>
            <li className={styles.text}>{user?.name || "Username"}</li>
            <li className={styles.text}>{user?.id || "ID"}</li>
          </ul>
        </div>
        <div className={styles.profile}>
          <div className={styles.head}>
            <h1>Thông tin</h1>
          </div>
          <div className={styles.content}>
            {user && (
              <div key={user.id} className={styles.userInfo}>
                <div className={styles.row}>
                  <span className={styles.label}>Tên người dùng:</span>
                  <span className={styles.value}>{user.name}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{user.email}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Vai trò:</span>
                  <span className={styles.value}>{user.role}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Số dư trang in:</span>
                  <span className={styles.value}>{user.balance} trang</span>
                </div>
              </div>
            )}
          </div>
          <div className={styles.foot}>
            <h1>Tài khoản</h1>
            {user && (
              <div className={styles.amount}>
                <div className={styles.detail}>
                  <span>Số dư:</span>
                  <span>
                    <b>{user.balance} trang</b>
                  </span>
                </div>
                <Link to="/recharge" className={styles.button}>
                  Nạp thêm trang
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
