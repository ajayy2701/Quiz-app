
const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizcontroller');

//  routes
router.get('/', (req, res) => {
    res.send('Quiz homepage');
});


router.post('/create', QuizController.createQuiz);

router.get('/active', QuizController.getActiveQuiz);
router.get('/:id/result', QuizController.getQuizResult);

module.exports = router;
