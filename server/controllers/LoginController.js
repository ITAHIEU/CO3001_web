const UserModel = require('../models/AdminModels'); // Đảm bảo import đúng model
const PrintJobModel = require('../models/printJob');
const Printer = require('../models/printerModel');

class UserController {
    // Đăng nhập
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Gọi model để lấy người dùng và so sánh mật khẩu
            console.log({email, password});
            const user = await UserModel.getUserByEmailAndRole(email, password, 'student');

            // Nếu đăng nhập thành công, trả về thông tin người dùng
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.user_id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    balance: user.balance
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
    getPrinterById= async (req, res) => {
        const { userId } = req.params;
        try {
          const printerJob = await PrintJobModel.getById(userId);
          res.status(200).json(printerJob);
        } catch (error) {
          res.status(500).json({ message: `Error fetching printerJob by ${userId}`, error });
        }
      };

}


module.exports = new UserController();