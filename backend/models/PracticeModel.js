// models/cauDiemLietModel.js
const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true, default: false },
            RequireQuestion: { type: Boolean, required: true}
        }
    ]
});

const Practice = mongoose.model('Practice', practiceSchema);

module.exports = Practice;
