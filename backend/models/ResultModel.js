const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResultSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    answers: [
        {
            practice: {
                type: Schema.Types.ObjectId,
                ref: 'Practice',
                required: true
            },
            selectedAnswer: {
                type: String,
                required: false, // Không bắt buộc để chấp nhận các câu hỏi không có câu trả lời
                default: null
            },
            isCorrect: {
                type: Boolean,
                default: false // Đặt mặc định là false nếu không có câu trả lời
            }
        }
    ],
    score: {
        type: Number,
        required: true
    },
    completedAt: {
        type: Date,
        default: () => new Date() 
    }
}, { timestamps: true });

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;
