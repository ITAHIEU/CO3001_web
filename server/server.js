const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./database/dbinfo');
const userRoutes = require('./routes/userRoutes');
const printerRoutes = require('./routes/printerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

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
app.use('/users', userRoutes);
app.use('/printers', printerRoutes);
app.use('/payments', paymentRoutes);
// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
    res.send('HCMUT Smart Printing Service API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
