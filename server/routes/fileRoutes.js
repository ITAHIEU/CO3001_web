const express = require('express');
const multer = require('multer');
const { UPLOAD_FOLDER, PERMITTED_FILE_TYPES } = require('../config/config');
const Document = require('../models/documentModel');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split('/')[1];
  if (Document.validateFileType(fileType, PERMITTED_FILE_TYPES)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or unsupported file type' });
  }

  const { originalname, mimetype, size } = req.file;
  const fileType = mimetype.split('/')[1];

  // Simulate calculating page count for the document
  const pageCount = Math.ceil(size / 1000); // Example logic for page count

  const document = new Document(Date.now(), originalname, fileType, pageCount);

  res.status(200).json({
    message: 'File uploaded successfully',
    document,
  });
});

module.exports = router;
