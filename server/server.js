const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./database/dbinfo');
const userRoutes = require('./routes/userRoutes');
const printerRoutes = require('./routes/printerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const LoginRoutes = require('./routes/LoginRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
// const storage = path.join(__dirname, '../uploads');

// (async () => {
//   try {
//     const [rows] = await db.query('SELECT * FROM Users');
//     console.log('Kết quả truy vấn:', rows);
//   } catch (error) {
//     console.error('Lỗi khi truy vấn:', error.message);
//   }
// })();

// Middleware để xử lý JSON
app.use(express.json());
// Các route
// app.use('/users', userRoutes);
app.use('/printers', printerRoutes);
app.use('/payments', paymentRoutes);
app.use('/users', LoginRoutes);
app.use('/admin',AdminRoutes);
// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
    res.send('HCMUT Smart Printing Service API is running!');

});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});
