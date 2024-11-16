const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/suggest/:id', matchController.suggestTopMentors);
router.post('/save', matchController.saveSelectedMatch);

module.exports = router;
