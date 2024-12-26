const Payment = require('../models/paymentModel');

const paymentController = {
  getPayments: async (req, res) => {
    try {
      const [payments] = await Payment.getAll();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payments', error });
    }
  },
  createPayment: async (req, res) => {
    const { userId, amountPaid, pagesBought, paymentMethod } = req.body;
    try {
      await Payment.create(userId, amountPaid, pagesBought, paymentMethod);
      res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating payment', error });
    }
  },
};

module.exports = paymentController;
