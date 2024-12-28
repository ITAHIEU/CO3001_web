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
const storage = path.join(__dirname, '../uploads');

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

// Initialize multer upload middleware with storage configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit (you can adjust this)
  },
  // Optionally, you can add file filter for file type validation
  // fileFilter: (req, file, cb) => {
  //   const allowedTypes = ['image/jpeg', 'image/png'];
  //   if (!allowedTypes.includes(file.mimetype)) {
  //     return cb(new Error('Invalid file type'), false);
  //   }
  //   cb(null, true);
  // }
});

// API endpoint for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  res.json({
    success: true,
    message: 'File uploaded successfully!',
    file: req.file, // Returns file info (e.g., filename, path, etc.)
  });
});

// Serve uploaded files statically for preview
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});
