const db = require('../database/dbinfo');

const User = {
  getAll: () => db.query('SELECT * FROM Users'),
  create: (name, email, role, balance) =>
    db.query('INSERT INTO Users (name, email, role, balance) VALUES (?, ?, ?, ?)', [name, email, role, balance || 0]),
  updateBalance: (userId, balance) =>
    db.query('UPDATE Users SET balance = ? WHERE user_id = ?', [balance, userId]),
  delete: (userId) => db.query('DELETE FROM Users WHERE user_id = ?', [userId]),
  getById: async (userId) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE user_id = ?', [userId])
    return rows;
  },
  getUserByEmailAndRole: async (email, role) => {
    try {
      const query = 'SELECT * FROM Users WHERE email = ? AND role = ?';
      const [rows] = await db.query(query, [email, role]);

      const user = rows[0];

      return user;
    } catch (err) {
      console.error('Error in getUserByEmailAndRole or comparing password:', err.message);
      throw err; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm
    }
  },
};


module.exports = User;