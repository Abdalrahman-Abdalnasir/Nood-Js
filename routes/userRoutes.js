const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.get('/user/add.html', userController.showAddPage);
router.get('/edit/:id', userController.showEditPage);
router.get('/view/:id', userController.showViewPage);

router.post('/user/add.html', userController.addUser);
router.post('/search', userController.searchUser);
router.delete('/edit/:id', userController.deleteUser);
router.put('/edit/:id', userController.updateUser);

module.exports = router;
