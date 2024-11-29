const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    
    // Create "uploads" directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensures it creates nested dirs if needed
    }
    
    cb(null, uploadDir); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp + original filename
  },
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
