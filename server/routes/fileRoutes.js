const express = require('express');
const multer = require('multer');
const { UPLOAD_FOLDER, PERMITTED_FILE_TYPES } = require('../config/config');
const Document = require('../models/documentModel');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Đường dẫn lưu file
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Đặt tên file duy nhất
  },
});

const upload = multer({ storage });

// API endpoint for file uploads
router.post('/upload', upload.single('file'), (req, res) => {
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



module.exports = router;
