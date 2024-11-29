import React, { useState, useEffect } from "react";
import styles from "./HistPage.module.css";
import UserHeader from "../../../components/UserHeader/UserHeader";
import Footer from "../../../components/FooterBar/Footer";
import { Link } from "react-router-dom";
const HistPage = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const [order, setOrder] = useState([]); // Initialize order as an empty array

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  const clickOutside = () => {
    if (isDropdownVisible) setDropdownVisible(false);
  };

  useEffect(() => {
    fetch("/user.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUsername(data[0].username);
          setOrder(data[0].order || []);
        }
      })
      .catch((error) => console.error("Error fetching username", error));
  }, []);

  return (
    <div onClick={clickOutside}>
    <UserHeader onToggleDropdown={toggleDropdown} activeIndex={2} />
      {isDropdownVisible && (
        <div className={styles.dropdown_container}>
          <ul className={styles.dropdown_contents}>
            <Link to="/profile-page" className={styles.link}><li>Hồ sơ</li></Link>
            <li>Nạp tiền </li>
            <Link to="/" className={styles.link}><li>Đăng xuất</li></Link>
          </ul>
        </div>
      )}
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className="material-symbols-outlined">account_circle</span>
          <ul>
            <li className={styles.text}>{username ? username : "Username"}</li>
            <li className={styles.text}>#111111</li>
          </ul>
        </div>
        <div className={styles.history}>
          <div className={styles.bar}>
            <ul>
              <li>Tất cả</li>
              <li>Chưa hoàn thành</li>
              <li>Hoàn thành</li>
            </ul>
          </div>
          <div className={styles.content}>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>Đơn hàng</th>
                  <th>Ngày</th>
                  <th>Loại</th>
                  <th>Số trang</th>
                  <th>Số tiền</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {order.length > 0 ? ( 
                  order.map((user) => (
                    <tr key={user.id}>
                      <td>{user.tax}</td>
                      <td>{user.date}</td>
                      <td>{user.type}</td>
                      <td>{user.pages}</td>
                      <td>{user.amount}</td>
                      <td
                        className={
                          user.status === "Đã hoàn thành" ? styles.done : styles.wait
                        }
                      >
                        {user.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noOrders}>
                      Không có đơn hàng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistPage;    