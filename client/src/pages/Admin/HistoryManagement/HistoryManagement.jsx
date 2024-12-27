import React, { useState, useEffect } from "react";
import BasicLineChart from "../../../components/Chart/Chart";
import styles from "./HistoryManagement.module.css";

const HistManagement = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState("Lịch sử");
  const [activeItem, setActiveItem] = useState("Lịch sử");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({ id: "", username: "", doc: "", date: "", amount: "", type: "", printer: "", cost: "" });
  
  const handleClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    fetch("/history.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUsers(data);
        }
      })
      .catch((error) => console.error("Error fetching username", error));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAdding) {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleAdd = () => {
    if (newUser.id && newUser.username) {
      setUsers([...users, newUser]);
      setNewUser({ id: "", username: "", doc: "", date: "", amount: "", type: "", printer: "", cost: "" });
      setIsAdding(false);
    } else {
      alert("Please fill in all required fields (ID and Username).");
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(search) ||
      user.doc.toLowerCase().includes(search) ||
      user.id.toString().includes(search)
    );
  });
  const costDataByMonth = Array(12).fill(0); 
  let totalPage = 0;
  users.forEach((user) => {
    const month = parseInt(user.date.slice(3, 5), 10) - 1; 
    const cost = parseFloat(user.cost) || 0;
    const page = parseInt(user.amount) || 0;
    if (!isNaN(month)) {
      costDataByMonth[month] += cost;
    }
    if(!isNaN(page)){
      totalPage += page;
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <p>Lịch sử in</p>
          <div className={styles.option}>
            <ul>
              <li
                onClick={() => {handleClick("Lịch sử");setState("Lịch sử");}}
                className={activeItem === "Lịch sử" ? styles.active : ""}
              >
                Lịch sử
              </li>
              <li
                onClick={() => {handleClick("Thống kê");setState("Thống kê")}}
                className={activeItem === "Thống kê" ? styles.active : ""}
              >
                Thống kê
              </li>
            </ul>
          </div>
        </div>
        {state === "Lịch sử" ? (<div className={styles.history}>
          <div className={styles.bar}>
            <input
              type="text"
              placeholder="Tìm kiếm theo ID, tên hoặc tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {/* <button onClick={() => setIsAdding(true)} style={{ color: "#000" }}>
              <span className="material-symbols-outlined">add</span>
            </button> */}
          </div>
          <div className={styles.content}>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ và tên</th>
                  <th>Tên tài liệu</th>
                  <th>Thời gian</th>
                  <th>Số lượng</th>
                  <th>Loại giấy</th>
                  <th>Máy in</th>
                  <th>Giá thành</th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr>
                    <td>
                      <input type="text" name="id" value={newUser.id} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="username" value={newUser.username} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="doc" value={newUser.doc} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="date" value={newUser.date} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="amount" value={newUser.amount} onChange={handleChange} />
                    </td>
                    <td>
                      <select name="type" value={newUser.type} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                      </select>
                    </td>
                    <td>
                      <select name="printer" value={newUser.printer} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="B4">B4</option>
                        <option value="H6">H6</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" name="cost" value={newUser.cost} onChange={handleChange} />
                    </td>
                    <td colSpan="2">
                      <button onClick={handleAdd} className={styles.save}>
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsAdding(false);
                          setNewUser({ id: "", username: "", doc: "", date: "", amount: "", type: "", printer: "", cost: "" });
                        }}
                        className={styles.remove}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
                {
                  filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.doc}</td>
                        <td>{user.date}</td>
                        <td>{user.amount}</td>
                        <td>{user.type}</td>
                        <td>{user.printer}</td>
                        <td>{user.cost}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className={styles.noOrders}>
                        Không có kết quả phù hợp
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>):
        <div className={styles.infoChart}>
          <table className={styles.staticTable}>
            <tbody>
              <tr>
                <td>Tổng trang in trong năm</td>
                <td>{totalPage}</td>
              </tr>
              <tr>
                <td>Tổng thu nhập trong năm</td>
                <td>{costDataByMonth.reduce((acc,current) => acc + current , 0)}</td>
              </tr>
            </tbody>
          </table>
          <BasicLineChart data={costDataByMonth}/>
        </div>
        }
      </div>
    </div>
  );
};

export default HistManagement;
