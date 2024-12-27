import React, { useState, useEffect } from "react";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({ id: "", username: "", gender: "", class: "", status: "" });
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetch("/admin.json")
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
    if (newUser.id && newUser.username) {
      setUsers([...users, newUser]);
      setNewUser({ id: "", username: "", gender: "", class: "", status: "" });
      setIsAdding(false);
    } else {
      alert("Please fill in all required fields (ID and Username).");
    }
  };

  const filteredUsers = users.filter((user) =>
    (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toString().includes(searchTerm)) &&
    (state === "" || user.status === state)
  );

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.history}>
          <div className={styles.bar}>
            <div>
              <input
                type="text"
                placeholder="Search by username or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <ul>
                <li onClick={() => setState("")}>Tất cả</li>
                <li onClick={() => setState("Đang hoạt động")}>Đang hoạt động</li>
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
                  <th>Username</th>
                  <th>Giới tính</th>
                  <th>Lớp</th>
                  <th>Trạng thái</th>
                  <th>Actions</th>
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
                      <input type="text" name="gender" value={newUser.gender} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="text" name="class" value={newUser.class} onChange={handleChange} />
                    </td>
                    <td>
                      <select name="status" value={newUser.status} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Đang hoạt động">Đang hoạt động</option>
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
                          setNewUser({ id: "", username: "", gender: "", class: "", status: "" });
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
                            <input type="text" name="username" value={editingUser.username} onChange={handleChange} />
                          </td>
                          <td>
                            <input type="text" name="gender" value={editingUser.gender} onChange={handleChange} />
                          </td>
                          <td>
                            <input type="text" name="class" value={editingUser.class} onChange={handleChange} />
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
                          <td>{user.username}</td>
                          <td>{user.gender}</td>
                          <td>{user.class}</td>
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
