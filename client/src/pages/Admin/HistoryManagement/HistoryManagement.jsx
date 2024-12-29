import React, { useState, useEffect } from "react";
import BasicLineChart from "../../../components/Chart/Chart";
import styles from "./HistoryManagement.module.css";

const HistManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [state, setState] = useState("Lịch sử");
  const [activeItem, setActiveItem] = useState("Lịch sử");
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (item) => {
    setActiveItem(item);
    setState(item);
  };

  // Fetch print job data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/printJob"); // Thay đổi endpoint nếu cần
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching print jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by search term
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();
    return (
      job.file_name.toLowerCase().includes(search) ||
      job.user_id.toString().includes(search) ||
      job.printer_id.toString().includes(search)
    );
  });

  // Calculate statistics
  const costDataByMonth = Array(12).fill(0); // Array for monthly costs
  let totalPages = 0;
  filteredJobs.forEach((job) => {
    const startMonth = new Date(job.start_time).getMonth(); // Extract month
    const pageCount = job.page_count_a4 + job.page_count_a3;
    totalPages += pageCount * job.copies;

    const cost = pageCount * job.copies * (job.sides === "double-sided" ? 1.5 : 1);
    costDataByMonth[startMonth] += cost;
  });

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <p>Lịch sử in</p>
          <div className={styles.option}>
            <ul>
              <li
                onClick={() => handleClick("Lịch sử")}
                className={activeItem === "Lịch sử" ? styles.active : ""}
              >
                Lịch sử
              </li>
              <li
                onClick={() => handleClick("Thống kê")}
                className={activeItem === "Thống kê" ? styles.active : ""}
              >
                Thống kê
              </li>
            </ul>
          </div>
        </div>

        {state === "Lịch sử" ? (
          <div className={styles.history}>
            <div className={styles.bar}>
              <input
                type="text"
                placeholder="Tìm kiếm theo file, ID người dùng hoặc máy in..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.content}>
              <table className={styles.orderTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Người dùng</th>
                    <th>Tài liệu</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Số trang A4</th>
                    <th>Số trang A3</th>
                    <th>Bản sao</th>
                    <th>Loại</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.job_id}>
                        <td>{job.job_id}</td>
                        <td>{job.user_id}</td>
                        <td>{job.file_name}</td>
                        <td>{new Date(job.start_time).toLocaleString()}</td>
                        <td>{new Date(job.end_time).toLocaleString()}</td>
                        <td>{job.page_count_a4}</td>
                        <td>{job.page_count_a3}</td>
                        <td>{job.copies}</td>
                        <td>{job.sides}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className={styles.noOrders}>
                        Không có kết quả phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={styles.infoChart}>
            <table className={styles.staticTable}>
              <tbody>
                <tr>
                  <td>Tổng số trang in trong năm</td>
                  <td>{totalPages}</td>
                </tr>
                <tr>
                  <td>Tổng chi phí trong năm</td>
                  <td>
                    {costDataByMonth.reduce((acc, current) => acc + current, 0).toFixed(2)} VND
                  </td>
                </tr>
              </tbody>
            </table>
            <BasicLineChart data={costDataByMonth} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistManagement;
