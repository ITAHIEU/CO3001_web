const express = require('express');
const router = express.Router();
const { payment , updateBalance } = require('../controllers/paymentController');

router.post('/payment' , payment);
router.post('/balance', updateBalance);

module.exports = router;