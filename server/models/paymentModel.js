
const db = require('../database/dbinfo'); // Kết nối với cơ sở dữ liệu

class Payment {
    // Cập nhật số dư và số trang của người dùng dựa trên giao dịch thanh toán
    updateUserBalanceAndPages = async (user_id) => {
        const connection = await db.getConnection(); // Bắt đầu kết nối
        try {
            await connection.beginTransaction(); // Bắt đầu giao dịch

            // Lấy chi tiết thanh toán mới nhất cho người dùng
            const fetchQuery = `
                SELECT amount_paid, pages_bought
                FROM Payments
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT 1
            `;
            const [paymentResult] = await connection.query(fetchQuery, [user_id]);

            if (paymentResult.length === 0) {
                throw new Error('No payment record found for the specified user.');
            }

            const { amount_paid, pages_bought } = paymentResult[0];

            // Cập nhật số dư và số trang của người dùng
            const updateQuery = `
                UPDATE Users
                SET balance = balance - ?, pages = pages - ?
                WHERE user_id = ?;
            `;
            await connection.query(updateQuery, [amount_paid, pages_bought, user_id]);

            await connection.commit(); // Xác nhận giao dịch
            return { success: true, message: 'User balance and pages updated successfully.' };
        } catch (err) {
            await connection.rollback(); // Hoàn tác nếu có lỗi
            console.error('Error updating user balance and pages:', err);
            throw err;
        } finally {
            connection.release(); // Đóng kết nối
        }
    };

    // Cập nhật số dư người dùng
    updateBalance = async ({ user_id, balance }) => {
        try {
            const query = `
                UPDATE Users
                SET balance = balance + ?
                WHERE user_id = ?;
            `;
            await db.query(query, [balance, user_id]);
        } catch (error) {
            console.error("Error updating balance:", error);
            throw error;
        }
    };
    create = async (userId, amountPaid, pagesBought, paymentMethod) => {
        try {
          // Thực hiện giao dịch để đảm bảo tính toàn vẹn dữ liệu
    
          // Thêm bản ghi thanh toán vào bảng `Payments`
          const insertPaymentQuery = `
            INSERT INTO Payments (user_id, amount_paid, pages_bought, payment_method)
            VALUES (?, ?, ?, ?)
          `;
          await db.query(insertPaymentQuery, [userId, amountPaid, pagesBought, paymentMethod]);
    
          // Cập nhật số trang của người dùng trong bảng `Users
        } catch (error) {
          // Rollback giao dịch nếu có lỗi
          console.error('Error creating payment:', error.message);
          throw new Error('Could not create payment.');
        }
      };
}

module.exports = new Payment();
