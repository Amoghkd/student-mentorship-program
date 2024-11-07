const express = require('express');
const { createMentee, getAllMentees } = require('../controllers/menteeController');
const router = express.Router();

router.post('/', createMentee);
router.get('/', getAllMentees);

module.exports = router;
