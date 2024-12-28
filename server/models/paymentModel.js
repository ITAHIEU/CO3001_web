const sql = require('../config/database'); // Kết nối với cơ sở dữ liệu

class payment {
  updateUserBalanceAndPages = async (user_id) => {
    const transaction = new sql.Transaction();
    try {
      // Start a new transaction
      await transaction.begin();

      const request = new sql.Request(transaction);

      // Fetch payment details for the user
      const fetchQuery = `
        SELECT TOP 1 amount_paid, pages_bought
        FROM Payments
        WHERE user_id = @user_id
        
      `;

      request.input('user_id', sql.Int, user_id);
      const paymentResult = await request.query(fetchQuery);

      if (paymentResult.recordset.length === 0) {
        throw new Error('No payment record found for the specified user.');
      }

      const { amount_paid, pages_bought } = paymentResult.recordset[0];

      // Update the user's balance and pages
      const updateQuery = `
      
        UPDATE Users
        SET balance = balance - @amount_paid, pages = pages - @pages_bought
        WHERE user_id = @user_id;
      `;

      request.input('amount_paid', sql.Int, amount_paid);
      request.input('pages_bought', sql.Int, pages_bought);

      await request.query(updateQuery);

      // Commit the transaction
      await transaction.commit();
      return { success: true, message: 'User balance and pages updated successfully.' };
    } catch (err) {
      // Roll back the transaction in case of error
      if (transaction.isActive) {
        await transaction.rollback();
      }
      console.error('Error updating user balance and pages:', err);
      throw err;
    }
  };
  updateBalance = async ({user_id, balance}) => {
    
    const request = new sql.Request();
  
  try {
    // Cập nhật balance cho user
    
      request.input('user_id', sql.Int, user_id)
      request.input('balance', sql.Int, balance)
      const query = `
        UPDATE Users
        SET balance = balance + @balance
        WHERE user_id = @user_id
      `;
    await request.query(query);
  } catch (error) {
    console.error("Error updating balance:", error);
    throw error;
  };
}
}
module.exports = new payment();
