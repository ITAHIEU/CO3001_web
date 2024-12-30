const User = require('../models/userModel');
const Payment = require('../models/paymentModel');

const userController = {
  getUsers: async (req, res) => {
    try {
      const [users] = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  },
  createUser: async (req, res) => {
    const { name, email, role, balance } = req.body;
    try {
      await User.create(name, email, role, balance);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  },
  buyPrintingPages: async (req, res) => {
    const { pagesBought, paymentMethod } = req.body;
    const {userId} = req.params;
    try {
      const user = await User.getById(userId);
      if (!user.length) {
        return res.status(404).json({ message: 'User not found' });
      }

      const costPerPage = 0.1; // Giá mỗi trang in
      const amountPaid = pagesBought * costPerPage;
      const newBalance = user[0].balance + pagesBought;
      await User.updateBalance(userId, newBalance);
      await Payment.create(userId, amountPaid, pagesBought, paymentMethod);

      res.status(200).json({ message: 'Pages purchased successfully', newBalance });
    } catch (error) {
      res.status(500).json({ message: 'Error buying printing pages', error });
    }
  },
  getById: async (req, res) => {
    const { userId } = req.params;
    try {
      const [result] = await db.promise().query('SELECT * FROM Users WHERE id = ?', [userId]);
      if (!result.length) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user by ID', error });
    }
  },
  async updateBalance(userId, newBalance) {
    try {
      await db.promise().query('UPDATE Users SET balance = ? WHERE id = ?', [newBalance, userId]);
      return { message: 'Balance updated successfully' };
    } catch (error) {
      throw new Error('Error updating balance: ' + error.message);
    }
  }
  
  
};

module.exports = userController;