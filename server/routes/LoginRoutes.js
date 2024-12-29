
const express = require("express");
const router = express.Router();
const { login, logout } = require('../controllers/LoginController');
const PrintProcessController = require('../controllers/printProcessController');
const userController = require('../controllers/userController');

router.get('/login', login);
router.get('/logout', logout);
router.post('/print', PrintProcessController.printDocument);
router.post('/:userId/buy', userController.buyPrintingPages);


module.exports = router;
