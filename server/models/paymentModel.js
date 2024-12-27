const db = require('../database/dbinfo');

const Payment = {
  getAll: () => db.query('SELECT * FROM Payments'),
  create: (userId, amountPaid, pagesBought, paymentMethod) =>
    db.query(
      'INSERT INTO Payments (user_id, amount_paid, pages_bought, payment_method) VALUES (?, ?, ?, ?)',
      [userId, amountPaid, pagesBought, paymentMethod]
    ),
  getByUser: (userId) => db.query('SELECT * FROM Payments WHERE user_id = ?', [userId]),
};

module.exports = Payment;