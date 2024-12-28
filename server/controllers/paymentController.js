const PaymenModels = require('../models/paymentModel');

class paymentControllers {
  payment = async (req, res) => {
    const { user_id } = req.body;

    // Validate input
    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required.' });
    }

    try {
      // Call the model function to update the user balance and pages
      const result = await PaymenModels.updateUserBalanceAndPages(user_id);
      

      if (!result) {
        return res.status(404).json({ message: 'No matching user or payment record found.' });
      }

      // Respond with success
      res.status(200).json({ message: 'Payment successfully processed.', result });
    } catch (err) {
      // Log and respond with error
      console.error('Error processing payment:', err);
      res.status(500).json({ message: 'An error occurred while processing the payment.', error: err.message });
    }
  };
  

  updateBalance = async (req, res) => {
        
    const { user_id, balance } = req.body;
    try {
       const result = await PaymenModels.updateBalance({user_id,  balance });
        res.status(200).json({ message: 'User updated successfully' , result});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
}

module.exports = new paymentControllers();