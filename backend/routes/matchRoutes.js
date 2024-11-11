const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// Route to suggest top mentors for a given mentee ID
router.get('/suggest/:id', matchController.suggestTopMentors);

// Route to save a selected match
router.post('/save', matchController.saveSelectedMatch);

module.exports = router;
return router 