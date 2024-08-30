const Quiz = require('../models/quiz');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { question, options, rightAnswer, startDate, endDate } = req.body;
        const newQuiz = new Quiz({
            question,
            options,
            rightAnswer,
            startDate,
            endDate,
            status: 'inactive',
        });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// active quiz
exports.getActiveQuiz = async (req, res) => {
    try {
        const now = new Date();
        const activeQuiz = await Quiz.findOne({ startDate: { $lte: now }, endDate: { $gte: now } });
        if (!activeQuiz) {
            return res.status(404).json({ message: 'No active quiz found' });
        } else {
            res.status(200).json(activeQuiz);
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



// quiz result by ID
exports.getQuizResult = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const now = new Date();
        const endDatePlusFiveMinutes = new Date(quiz.endDate.getTime() + 5 * 60000);

        if (now < endDatePlusFiveMinutes) {
            res.status(403).json({ message: 'Result not available yet' });
        } else {
            res.status(200).json({ rightAnswer: quiz.options[quiz.rightAnswer] });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
