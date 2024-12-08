// Import MySQL library
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Tên người dùng MySQL
  password: '', // Mật khẩu MySQL của bạn
  database: 'cnpm',    // Tên cơ sở dữ liệu bạn đã tạo
});