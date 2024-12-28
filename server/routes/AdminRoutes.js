
const express = require("express");
const router = express.Router();
const { login, logout, addUser, updateUser,deleteUser } = require('../controllers/AdminControllers');

router.get('/login', login);
router.get('/logout', logout);
router.post('/add', addUser);
router.put('/update/:user_id', updateUser);
router.delete('/delete/:user_id' , deleteUser);


module.exports = router;
