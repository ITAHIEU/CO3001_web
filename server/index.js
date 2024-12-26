const mysql = require('mysql2');

// Tạo kết nối với MySQL
const connection = mysql.createConnection({
  host: 'localhost',        // Địa chỉ server MySQL (thay bằng IP nếu không phải localhost)
  port: 3307,               // Cổng MySQL (khớp với cổng ánh xạ trong Docker)
  user: 'root',             // Tên người dùng MySQL
  password: '123456',       // Mật khẩu của MySQL
  database: 'CNPM',      // Tên cơ sở dữ liệu
  ssl: false,               // Tắt SSL (không bắt buộc trong môi trường phát triển)
  authPlugins: {
    caching_sha2_password: () => require('mysql2/lib/auth_plugins/caching_sha2_password'),
  },
});

// Kết nối và xử lý lỗi
connection.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại:', err);
    return;
  }
  console.log('Kết nối thành công!');
});
