const express = require('express');
const router = express.Router();
const menteeController = require('../controllers/menteeController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', menteeController.getAll);
router.post('/', menteeController.create);
router.get('/:id', menteeController.findById);
router.put('/:id', menteeController.update);
router.delete('/:id',menteeController.delete);

module.exports = router;
