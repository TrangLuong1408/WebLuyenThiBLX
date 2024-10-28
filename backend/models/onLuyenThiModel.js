// models/cauDiemLietModel.js
const mongoose = require('mongoose');

const onLuyenThiSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ]
});

const OnLuyenThi = mongoose.model('OnLuyenThi', onLuyenThiSchema);

module.exports = OnLuyenThi;
