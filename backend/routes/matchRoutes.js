const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/suggest/:id', verifyToken, authorizeRoles('admin', 'mentee'), matchController.suggestTopMentors);
router.post('/save', verifyToken, authorizeRoles('admin', 'mentee'), matchController.saveSelectedMatch);

module.exports = router;
