const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, authorizeRoles('admin'), mentorController.getAll);
router.post('/', verifyToken, authorizeRoles('admin', 'mentor'), mentorController.create);
router.get('/:id', verifyToken, authorizeRoles('admin', 'mentor'), mentorController.findById);
router.put('/:id', verifyToken, authorizeRoles('admin', 'mentor'), mentorController.update);
router.delete('/:id', verifyToken, authorizeRoles('admin'), mentorController.delete);

module.exports = router;
