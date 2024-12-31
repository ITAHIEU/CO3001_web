import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm cập nhật số dư trang in
  const updatePrintBalance = useCallback(async (pagesToSubtract) => {
    if (user && user.balance >= pagesToSubtract) {
      const updatedUser = { ...user, balance: user.balance - pagesToSubtract };
      setUser(updatedUser);

      // Gửi yêu cầu cập nhật lên server
      try {
        await fetch("http://localhost:5000/api/users/updateBalance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, balance: updatedUser.balance }),
        });
      } catch (error) {
        console.error("Lỗi khi cập nhật số dư:", error);
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      alert("Không đủ số dư trang in!");
    }
  }, [user]);

  // Sử dụng useEffect để thiết lập sự kiện in ấn
  useEffect(() => {
    const handleBeforePrint = () => {
      const pagesToSubtract = 1; // Số trang cần trừ mỗi lần in
      updatePrintBalance(pagesToSubtract);
    };

    window.addEventListener("beforeprint", handleBeforePrint);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, [updatePrintBalance]);
  

  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

      useEffect(() => {
  const fetchUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const response = await fetch(`http://localhost:5000/api/users/${storedUser.id}`);
        if (response.ok) {
          const freshUser = await response.json();
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu người dùng:", error);
    }
  };

  fetchUserData();
}, []);

  if (loading) {
    return <div className={styles.loading}>Đang tải thông tin người dùng...</div>;
  }

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
