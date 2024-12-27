import React, { useState, useEffect } from "react";
import styles from "./HistPage.module.css";
const HistPage = () => {
  const [username, setUsername] = useState(null);
  const [order, setOrder] = useState([]); // Initialize order as an empty array
  const [state, setState] = useState("");
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
    <div className={styles.container}>
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
              <li onClick={() => setState("")}>Tất cả</li>
              <li onClick={() => setState("Chưa hoàn thành")}>Chưa hoàn thành</li>
              <li onClick={() => setState("Đã hoàn thành")}>Hoàn thành</li>
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
                  order.map((user) => ( (state === user.status || state === "") &&
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
    </div>
  );
};

export default HistPage;    