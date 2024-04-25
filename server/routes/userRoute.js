
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


router.post('/postuser', UserController.upload.single('photo'), UserController.createUser);
router.get('/getuser', UserController.getAllUsers);
router.put('/updateuser/:id', UserController.updateUser);
router.delete('/deleteuser/:id', UserController.deleteUser);

module.exports = router;



