const mysql = require('mysql2');

// Cấu hình kết nối
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'CNPM',
  port: '3307'
});

// Xuất kết nối sử dụng Promise
module.exports = connection.promise();
