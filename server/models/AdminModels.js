const sql = require('../config/database'); // Kết nối với cơ sở dữ liệu


class AdminModel {
    // Lấy thông tin người dùng theo email và so sánh mật khẩu trực tiếp
    getAdminByEmail = async (email, password) => {
        try {
            const request = new sql.Request();
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);

            const query = `
                SELECT * FROM Admins WHERE email = @email AND password = @password
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
            console.error('Error in getAdminByEmail or comparing password:', err.message);
            throw err; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm
        } 
    };

    addUser = async ({  name, email, password, role = 'student', balance = 0 }) => {
        try {
            const request = new sql.Request();
            // request.input('user_id', sql.Int, user_id);
            request.input('name', sql.NVarChar, name);
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);
            request.input('role', sql.NVarChar, role);
            request.input('balance', sql.Int, balance);

            const query = `
                INSERT INTO Users ( name, email, password, role, balance)
                OUTPUT INSERTED.user_id
                VALUES ( @name, @email, @password, @role, @balance)
            `;

            const result = await request.query(query);
            return result.recordset[0].user_id; // Trả về ID của người dùng vừa thêm
        } catch (err) {
            console.error('Error in addUser:', err.message);
            throw err;
        }
    };

    // Sửa thông tin người dùng
    updateUser = async ({user_id,  name, email, password, role, balance }) => {
        try {
            const request = new sql.Request();
            request.input('user_id', sql.Int, user_id);
            request.input('name', sql.NVarChar, name);
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);
            request.input('role', sql.NVarChar, role);
            request.input('balance', sql.Int, balance);

            const query = `
                UPDATE Users
                SET 
                    name = @name,
                    email = @email,
                    password = @password,
                    role = @role,
                    balance = @balance
                    
                WHERE user_id = @user_id
            `;

            await request.query(query);
        } catch (err) {
            console.error('Error in updateUser:', err.message);
            throw err;
        }
    };

    // Xóa người dùng
    deleteUser = async (user_id) => {
        try {
            const request = new sql.Request();
            request.input('user_id', sql.Int, user_id);

            const query = `
                DELETE FROM Users WHERE user_id = @user_id
            `;

            await request.query(query);
        } catch (err) {
            console.error('Error in deleteUser:', err.message);
            throw err;
        }
    };
    
}

module.exports = new AdminModel();