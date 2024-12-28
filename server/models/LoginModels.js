const sql = require('../config/database'); // Kết nối với cơ sở dữ liệu


class UserModel {
    // Lấy thông tin người dùng theo email và so sánh mật khẩu trực tiếp
    getUserByEmail = async (email, password) => {
        try {
            const request = new sql.Request();
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);

            const query = `
                SELECT * FROM Users WHERE email = @email AND password = @password
            `;

             const result = await request.query(query);

            // Kiểm tra nếu không tìm thấy người dùng
            if (result.recordset.length === 0) {
                throw new Error('User not found or Password Invalid');
            } 

            const user = result.recordset[0];

            // Nếu mật khẩu trong cơ sở dữ liệu và mật khẩu người dùng nhập vào khớp
            if (user.password!== password) {
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