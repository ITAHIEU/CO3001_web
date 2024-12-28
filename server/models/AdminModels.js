const db = require('../database/dbinfo'); // Kết nối với cơ sở dữ liệu

class AdminModel {
    // Lấy thông tin người dùng theo email và so sánh mật khẩu trực tiếp
    getAdminByEmail = async (email, password) => {
        try {
            const query = 'SELECT * FROM Admins WHERE email = ? AND password = ?';
            const [rows] = await db.query(query, [email, password]);

            // Kiểm tra nếu không tìm thấy người dùng
            if (rows.length === 0) {
                throw new Error('User not found or Password Invalid');
            }

            const user = rows[0];

            // Nếu mật khẩu trong cơ sở dữ liệu và mật khẩu người dùng nhập vào khớp
            if (user.password !== password) {
                throw new Error('Invalid password');
            }

            return user;
        } catch (err) {
            console.error('Error in getAdminByEmail or comparing password:', err.message);
            throw err; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm
        }
    };

    // Thêm người dùng
    addUser = async ({ name, email, password, role = 'student', balance = 0 }) => {
        try {
            const query = `
                INSERT INTO Users (name, email, password, role, balance)
                VALUES (?, ?, ?, ?, ?)
            `;

            const [result] = await db.query(query, [name, email, password, role, balance]);

            return result.insertId; // Trả về ID của người dùng vừa thêm
        } catch (err) {
            console.error('Error in addUser:', err.message);
            throw err;
        }
    };

    // Sửa thông tin người dùng
    updateUser = async ({ user_id, name, email, password, role, balance }) => {
        try {
            const query = `
                UPDATE Users
                SET 
                    name = ?,
                    email = ?,
                    password = ?,
                    role = ?,
                    balance = ?
                WHERE user_id = ?
            `;

            await db.query(query, [name, email, password, role, balance, user_id]);
        } catch (err) {
            console.error('Error in updateUser:', err.message);
            throw err;
        }
    };

    // Xóa người dùng
    deleteUser = async (user_id) => {
        try {
            const query = 'DELETE FROM Users WHERE user_id = ?';
            await db.query(query, [user_id]);
        } catch (err) {
            console.error('Error in deleteUser:', err.message);
            throw err;
        }
    };
}

module.exports = new AdminModel();
