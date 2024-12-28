const express = require('express');
const PrinterController = require('../controllers/printerController');
const PrintProcessController = require('../controllers/printProcessController');

const router = express.Router();

// Define routes
router.get('/printers', PrinterController.getAllPrinters);
router.post('/print', PrintProcessController.printDocument);

module.exports = router;
