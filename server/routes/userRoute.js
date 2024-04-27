
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


router.post('/postuser', UserController.upload.single('photo'), UserController.createUser);
router.get('/getalluser', UserController.getAllUsers);
router.put('/updateuser/:id',UserController.upload.single('photo'), UserController.updateUser);
router.delete('/deleteuser/:id', UserController.deleteUser);
router.get('/user/:id', UserController.getUser);

module.exports = router;



