const express = require('express');
const router = express.Router();
const menteeController = require('../controllers/menteeController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, authorizeRoles('admin'), menteeController.getAll);
router.post('/', verifyToken, authorizeRoles('admin', 'mentor'), menteeController.create);
router.get('/:id', verifyToken, authorizeRoles('admin', 'mentee'), menteeController.findById);
router.put('/:id', verifyToken, authorizeRoles('admin', 'mentee'), menteeController.update);
router.delete('/:id', verifyToken, authorizeRoles('admin'), menteeController.delete);

module.exports = router;
