const UserModel = require('../models/LoginModels'); // Đảm bảo import đúng model

class UserController {
    // Đăng nhập
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Gọi model để lấy người dùng và so sánh mật khẩu
            const user = await UserModel.getUserByEmail(email, password);

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

}


module.exports = new UserController();