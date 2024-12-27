const db = require('../database/dbinfo');

const User = {
  getAll: () => db.query('SELECT * FROM Users'),
  create: (name, email, role, balance) =>
    db.query('INSERT INTO Users (name, email, role, balance) VALUES (?, ?, ?, ?)', [name, email, role, balance || 0]),
  updateBalance: (userId, balance) =>
    db.query('UPDATE Users SET balance = ? WHERE user_id = ?', [balance, userId]),
  delete: (userId) => db.query('DELETE FROM Users WHERE user_id = ?', [userId]),
  getById: (userId) => db.query('SELECT * FROM Users WHERE user_id = ?', [userId]),
};


module.exports = User;