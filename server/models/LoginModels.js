const db = require('../database/dbinfo'); // Kết nối với cơ sở dữ liệu

class UserModel {
    // Lấy thông tin người dùng theo email và so sánh mật khẩu trực tiếp
    getUserByEmail = async (email, password) => {
        try {
            const query = 'SELECT * FROM Users WHERE email = ?';
            const [rows] = await db.query(query, [email]);

            // Kiểm tra nếu không tìm thấy người dùng
            if (rows.length === 0) {
                throw new Error('User not found');
            }

            const user = rows[0];

            // Nếu mật khẩu trong cơ sở dữ liệu và mật khẩu người dùng nhập vào không khớp
            if (user.password !== password) {
                throw new Error('Invalid password');
            }

            return user;
        } catch (err) {
            console.error('Error in getUserByEmail or comparing password:', err.message);
            throw err; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm
        }
    };
}

module.exports = new UserModel();
