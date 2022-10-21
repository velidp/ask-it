const express = require('express');
const questionsController = require('../controllers/questions.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/all-questions', questionsController.getQuestions);
router.get('/hot-questions', questionsController.hotQuestions);
router.get('/my-questions/:id', auth, questionsController.myQuestions);
router.post('/', auth, questionsController.createQuestion);
router.patch('/', auth, auth, questionsController.likeQuestion);

module.exports = router;