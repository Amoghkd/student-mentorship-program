const express = require('express');
const authController = require('../controllers/authController');
const AdminController = require('../controllers/adminController');
//const roleController=require('../controllers/roleController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
//router.post('/get-role', roleController.getRoleByUsername);

// Route to get the count of mentors and mentees
router.get('/user-counts', AdminController.getUserCounts);

// Route to fetch all users
router.get('/all-users', AdminController.getAllUsers);

module.exports = router;

module.exports = router;
return router 