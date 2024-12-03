import React, { useState, useEffect } from "react";
import styles from "./PrinterManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState("");
  const [option, setOption] = useState("Danh sách máy in");
  const [activeItem, setActiveItem] = useState("Danh sách máy in");
  const [editingUser, setEditingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({ id: "", brand: "", model: "", location: "", status: "" });
  const [searchTerm, setSearchTerm] = useState(""); 
  const handleClick = (item) => {
    setActiveItem(item);
  };
  useEffect(() => {
    fetch("/printer.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const handleRemove = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAdding) {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleAdd = () => {
    if (newUser.id && newUser.brand) {
      setUsers([...users, newUser]);
      setNewUser({ id: "", brand: "", model: "", location: "", status: "" });
      setIsAdding(false);
    } else {
      alert("Please fill in all required fields (ID and Username).");
    }
  };

  const filteredUsers = users.filter((user) =>
    (user.location.toLowerCase().includes(searchTerm.toLowerCase()) || user.brand.toLowerCase().includes(searchTerm.toLowerCase()) || user.model.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toString().includes(searchTerm)) &&
    (state === "" || user.status === state)
  );

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {/* <div className={styles.info}>
            <p>Quản lý máy in</p>
            <div className={styles.option}>
                <ul>
                <li
                    onClick={() => {handleClick("Danh sách máy in");setOption("Danh sách máy in");}}
                    className={activeItem === "Danh sách máy in" ? styles.active : ""}
                >
                    Danh sách máy in
                </li>
                <li
                    onClick={() => {handleClick("Thiết lập hệ thống");setOption("Thiết lập hệ thống")}}
                    className={activeItem === "Thiết lập hệ thống" ? styles.active : ""}
                >
                    Thiết lập hệ thống
                </li>
                </ul>
            </div>
        </div> */}
        <div className={styles.history}>
          <div className={styles.bar}>
            <div>
              <input
                type="text"
                placeholder="Search by brand, model or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <ul>
                <li onClick={() => setState("")}>Tất cả</li>
                <li onClick={() => setState("Hoạt động")}>Hoạt động</li>
                <li onClick={() => setState("Không hoạt động")}>Không hoạt động</li>
              </ul>
            </div>
            <button onClick={() => setIsAdding(true)} style={{ color: "#000" }}>
                <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className={styles.content}>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Địa điểm</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr>
                    <td>
                      <input type="text" name="id" value={newUser.id} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="brand" value={newUser.username} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="model" value={newUser.gender} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="location" value={newUser.class} onChange={handleChange} />
                    </td>
                    <td>
                      <select name="status" value={newUser.status} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Không hoạt động">Không hoạt động</option>
                      </select>
                    </td>
                    <td colSpan="2">
                        <div className={styles.interact}>
                            <button onClick={handleAdd} className={styles.save}>
                            Save
                        </button>
                        <button onClick={() => {
                            setIsAdding(false);
                            setNewUser({ id: "", brand: "", model: "", location: "", status: "" });
                            }} className={styles.remove}>
                            Cancel
                        </button>
                        </div>
                    </td>
                  </tr>
                )}
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      {editingUser?.id === user.id ? (
                        <>
                          <td>
                            <input type="text" name="id" value={editingUser.id} onChange={handleChange} />
                          </td>
                          <td>
                            <input type="text" name="brand" value={editingUser.brand} onChange={handleChange} />
                          </td>
                          <td>
                            <input type="text" name="model" value={editingUser.model} onChange={handleChange} />
                          </td>
                          <td>
                            <input type="text" name="location" value={editingUser.location} onChange={handleChange} />
                          </td>
                          <td>
                            <select name="status" value={editingUser.status} onChange={handleChange}>
                              <option value="Đang hoạt động">Đang hoạt động</option>
                              <option value="Không hoạt động">Không hoạt động</option>
                            </select>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{user.id}</td>
                          <td>{user.brand}</td>
                          <td>{user.model}</td>
                          <td>{user.location}</td>
                          <td>{user.status}</td>
                        </>
                      )}
                      <td>
                        <div className={styles.interact}>
                          {editingUser?.id === user.id ? (
                            <button className={styles.save} onClick={handleSave}>
                              Save
                            </button>
                          ) : (
                            <button className={styles.edit} onClick={() => handleEdit(user)}>
                              Edit
                            </button>
                          )}
                          <button className={styles.remove} onClick={() => handleRemove(user.id)}>
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className={styles.noOrders}>
                      Không có người dùng nào
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

export default UserManagement;
