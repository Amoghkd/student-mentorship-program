const express = require('express');
const router = express.Router();
const menteeController = require('../controllers/menteeController');

// Route to get all mentees
router.get('/', menteeController.getAll);
// Route to create a new mentee
router.post('/', menteeController.create);
// Route to get a specific mentee by ID
router.get('/:id', menteeController.findById);
// Route to update a specific mentee by ID
router.put('/:id', menteeController.update);
// Route to delete a specific mentee by ID
router.delete('/:id', menteeController.delete);

module.exports = router;
return router 
