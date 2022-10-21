const express = require('express');
const answerController = require('../controllers/answers.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.delete('/:id', auth, answerController.deleteAnswer);
router.patch('/:id', auth, answerController.updateAnswer);
router.post('/', auth, answerController.createAnswer);
router.patch('/', auth, answerController.likeAnswer);

module.exports = router;