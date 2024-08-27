const mongoose = require('mongoose');

// Check if the model is already compiled before defining it
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    rightAnswer: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['inactive', 'active', 'finished'],
        default: 'inactive'
    }
}));

module.exports = Quiz;
