const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.get('/', mentorController.getAll);
router.post('/', mentorController.create);
router.get('/:id', mentorController.findById);
router.put('/:id', mentorController.update);
router.delete('/:id', mentorController.delete);

module.exports = router;
return router 