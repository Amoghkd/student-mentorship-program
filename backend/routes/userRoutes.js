const express = require('express');
const AdminController = require('../controllers/adminController');
const router = express.Router();

// Get user counts
router.get('/user-counts', AdminController.getUserCounts);

// Get all users
router.get('/all-users', AdminController.getAllUsers);

// Get a user by ID
router.get('/users/:id', AdminController.getUserById);

// Create a new user
router.post('/users', AdminController.createUser);

// Update an existing user
router.put('/users/:id', AdminController.updateUser);

// Delete a user
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
