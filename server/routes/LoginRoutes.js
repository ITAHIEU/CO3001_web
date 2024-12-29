
const express = require("express");
const router = express.Router();
const { login, logout } = require('../controllers/LoginController');
const {createPrintJob} = require('../controllers/printProcessController');
const userController = require('../controllers/userController');

router.post('/login', login);
router.get('/logout', logout);
router.post('/print', createPrintJob);
router.post('/:userId/buy', userController.buyPrintingPages);


module.exports = router;
