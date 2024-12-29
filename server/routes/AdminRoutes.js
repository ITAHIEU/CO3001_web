
const express = require("express");
const router = express.Router();
const { login, logout, addUser, updateUser,deleteUser, getPrintJob } = require('../controllers/AdminControllers');
const userController = require('../controllers/userController');

router.get('/login', login);
router.get('/logout', logout);
router.post('/add', addUser);
router.put('/update/:user_id', updateUser);
router.delete('/delete/:user_id' , deleteUser);
router.get('/', userController.getUsers);
router.get('/printJob', getPrintJob);


module.exports = router;
