const db = require('./database/dbinfo');


(async () => {
  try {
    const [rows] = await db.query('SELECT * FROM Users');
    console.log('Kết quả truy vấn:', rows);
  } catch (error) {
    console.error('Lỗi khi truy vấn:', error.message);
  }
})();
