import React, { useState, useEffect } from "react";
import styles from "./HistPage.module.css";

const HistPage = () => {
  const [username, setUsername] = useState(null);
  const [history, setHistory] = useState([]);
  const [state, setState] = useState("");
  const [userId, setUserId] = useState(null);

  // Lấy userId từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // JSON stored in localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id); // Lấy `id` từ đối tượng user
      setUsername(parsedUser.name || "Unknown User");
    }
  }, []);

  // Fetch lịch sử in từ API
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/users/printJobs/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setHistory(data); // Set lịch sử in
          } else {
            setHistory([]);
          }
        })
        .catch((error) => console.error("Error fetching history", error));
    }
  }, [userId]);

  // Lọc dữ liệu lịch sử in
  const filteredHistory = history.filter(
    (item) =>
      state === "" ||
      (state === "Đã hoàn thành" && item.status === "enabled") ||
      (state === "Chưa hoàn thành" && item.status !== "enabled")
  );

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className="material-symbols-outlined">account_circle</span>
          <ul>
            <li className={styles.text}>{username || "Username"}</li>
            <li className={styles.text}>ID: #{userId || "N/A"}</li>
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
                  <th>Tài liệu</th>
                  <th>Ngày in</th>
                  <th>Loại giấy</th>
                  <th>Số trang A4</th>
                  <th>Số trang A3</th>
                  <th>Số bản sao</th>
                  <th>Tình trạng</th>
                  <th>Máy in</th>
                  <th>Phòng</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <tr key={item.job_id}>
                      <td>{item.file_name}</td>
                      <td>{new Date(item.start_time).toLocaleString()}</td>
                      <td>{item.sides}</td>
                      <td>{item.page_count_a4}</td>
                      <td>{item.page_count_a3}</td>
                      <td>{item.copies}</td>
                      <td
                        className={
                          item.status === "enabled" ? styles.done : styles.wait
                        }
                      >
                        {item.status === "enabled"
                          ? "Đã hoàn thành"
                          : "Chưa hoàn thành"}
                      </td>
                      <td>{`${item.brand} ${item.model}`}</td>
                      <td>{`${item.campus_name}, ${item.building_name}, ${item.room_number}`}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className={styles.noOrders}>
                      Không có lịch sử in nào
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
