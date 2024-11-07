const express = require('express');
const { createMentor, getAllMentors } = require('../controllers/mentorController');
const router = express.Router();

router.post('/', createMentor);
router.get('/', getAllMentors);

module.exports = router;
