const mysql = require('mysql2');

// Cấu hình kết nối
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'cnpm',
  port: '3308',
  // ssl: false,               // Tắt SSL (không bắt buộc trong môi trường phát triển)
  // authPlugins: {
  //   caching_sha2_password: () => require('mysql2/lib/auth_plugins/caching_sha2_password'),
  // },
});

// Xuất kết nối sử dụng Promise
module.exports = connection.promise();
