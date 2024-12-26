const express = require('express');
const printerController = require('../controllers/printerController');

const router = express.Router();
router.get('/', printerController.getPrinters);
router.post('/', printerController.createPrinter);
router.patch('/:printerId/status', printerController.updatePrinterStatus);

module.exports = router;