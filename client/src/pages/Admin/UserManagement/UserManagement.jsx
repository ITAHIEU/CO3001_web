import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    balance: 0,
  });
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const handleAdd = async () => {
    if (newUser.name && newUser.email) {
      try {
        const response = await axios.post("http://localhost:5000/admin/add", newUser);
        fetchUsers(); // Reload users
        setNewUser({ name: "", email: "", role: "student", balance: 0 });
        setIsAdding(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Edit a user
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/admin/update/${editingUser.user_id}`, editingUser);
      fetchUsers(); // Reload users
      setEditingUser(null);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  // Delete a user
  const handleRemove = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/admin/delete/${id}`);
      fetchUsers(); // Reload users
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle input changes for add/edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAdding) {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  // Filter users by search term and role
  const filteredUsers = users.filter(
    (user) =>
      user &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (state === "" || user.role === state)
  );

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.history}>
          <div className={styles.bar}>
            <div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <ul>
                <li onClick={() => setState("")}>Tất cả</li>
                <li onClick={() => setState("student")}>Student</li>
                <li onClick={() => setState("SPSO")}>SPSO</li>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr>
                    <td colSpan={6}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleChange}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleChange}
                      />
                      <select name="role" value={newUser.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="SPSO">SPSO</option>
                      </select>
                      <input
                        type="number"
                        name="balance"
                        placeholder="Balance"
                        value={newUser.balance}
                        onChange={handleChange}
                      />
                      <button onClick={handleAdd} className={styles.save}>
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsAdding(false);
                          setNewUser({ name: "", email: "", role: "student", balance: 0 });
                        }}
                        className={styles.remove}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.user_id}>
                      {editingUser?.user_id === user.user_id ? (
                        <>
                          <td>{user.user_id}</td>
                          <td>
                            <input
                              type="text"
                              name="name"
                              value={editingUser.name}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              name="email"
                              value={editingUser.email}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <select
                              name="role"
                              value={editingUser.role}
                              onChange={handleChange}
                            >
                              <option value="student">Student</option>
                              <option value="SPSO">SPSO</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="balance"
                              value={editingUser.balance}
                              onChange={handleChange}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{user.user_id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.balance}</td>
                        </>
                      )}
                      <td>
                        {editingUser?.user_id === user.user_id ? (
                          <button className={styles.save} onClick={handleSave}>
                            Save
                          </button>
                        ) : (
                          <button
                            className={styles.edit}
                            onClick={() => setEditingUser(user)}
                          >
                            Edit
                          </button>
                        )}
                        {/* <button
                          className={styles.remove}
                          onClick={() => handleRemove(user.user_id)}
                        >
                          Remove
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No users found.
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
