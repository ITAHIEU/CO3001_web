const express = require('express');
const printerController = require('../controllers/printerController');

const router = express.Router();
router.get('/', printerController.getPrinters);
router.post('/', printerController.createPrinter);
router.put('/:printerId', printerController.updatePrinter); // Sửa thông tin máy in
router.delete('/:printerId', printerController.deletePrinter); // Xóa máy in
router.patch('/:printerId/status', printerController.updatePrinterStatus);

module.exports = router;