const AdminModel = require('../models/AdminModels'); // Đảm bảo import đúng model

class AdminController {
    // Đăng nhập
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Gọi model để lấy người dùng và so sánh mật khẩu
            const user = await AdminModel.getAdminByEmail(email, password);

            // Nếu đăng nhập thành công, trả về thông tin người dùng
            res.status(200).json({
                message: 'Login successful',
                user: {
                    email: user.Email,
                    name: user.name,
                    // Thêm các trường thông tin người dùng nếu cần
                }
            });
        } catch (err) {
            // Nếu có lỗi (ví dụ: người dùng không tồn tại hoặc mật khẩu sai)
            res.status(401).json({ message: err.message });
        }
    };

    // Đăng xuất
    logout = (req, res) => {
        // Xử lý đăng xuất, ví dụ xóa cookie, session, token,...
        res.status(200).json({ message: 'Logged out successfully' });
    };
    addUser = async (req, res) => {
        const { name, email, password, role, balance } = req.body;
        try {
            const result = await AdminModel.addUser({ name, email, password, role, balance });
            res.status(201).json({ message: 'User added successfully', result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };
    // Sửa thông tin người dùng
    updateUser = async (req, res) => {
        
        const { user_id, name, email, password, role, balance } = req.body;
        try {
           const result = await AdminModel.updateUser({user_id,  name, email, password, role, balance });
            res.status(200).json({ message: 'User updated successfully' , result});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    // Xóa người dùng
    deleteUser = async (req, res) => {
        const { user_id } = req.params;
        try {
            await AdminModel.deleteUser(user_id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

}


module.exports = new AdminController();