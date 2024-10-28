// models/cauDiemLietModel.js
const mongoose = require('mongoose');

const cauDiemLietSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ]
});

const CauDiemLiet = mongoose.model('CauDiemLiet', cauDiemLietSchema);

module.exports = CauDiemLiet;
