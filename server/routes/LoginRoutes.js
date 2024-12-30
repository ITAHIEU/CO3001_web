
const express = require("express");
const router = express.Router();
const { login, logout,getPrinterById } = require('../controllers/LoginController');
const {createPrintJob} = require('../controllers/printProcessController');
const userController = require('../controllers/userController');

router.post('/login', login);
router.get('/logout', logout);
router.post('/print', createPrintJob);
router.get('/printJobs/:userId', getPrinterById);

router.post('/:userId/buy', userController.buyPrintingPages);


module.exports = router;
