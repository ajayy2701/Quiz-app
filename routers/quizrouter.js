// routers/quizRouter.js
const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

// Define the routes
router.get('/', (req, res) => {
    res.send('Quiz homepage');
});

// Example of other routes you might define
router.post('/create', QuizController.createQuiz);

router.get('/active', QuizController.getActiveQuiz);
router.get('/:id/result', QuizController.getQuizResult);

module.exports = router;
