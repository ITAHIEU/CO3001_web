const UserModel = require('../models/AdminModels'); // Đảm bảo import đúng model

class UserController {
    // Đăng nhập
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Gọi model để lấy người dùng và so sánh mật khẩu
            const user = await UserModel.getUserByEmailAndRole(email, password, 'student');

            // Nếu đăng nhập thành công, trả về thông tin người dùng
            res.status(200).json({
                message: 'Login successful',
                user: {
                    email: user.email,
                    name: user.name,
                    role: user.role
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

}


module.exports = new UserController();