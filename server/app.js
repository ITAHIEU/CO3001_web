// const db = require('./database/dbinfo');
// const printProcessRoutes = require('./routes/printProcessRoutes');

// (async () => {
//   try {
//     const [rows] = await db.query('SELECT * FROM Users');
//     console.log('Kết quả truy vấn:', rows);
//   } catch (error) {
//     console.error('Lỗi khi truy vấn:', error.message);
//   }
// })();

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Use print process routes
// app.use('/api/print', printProcessRoutes);
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });