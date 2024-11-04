import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateQuiz = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([{ text: '', isCorrect: false }]);
    const [requireQuestion, setRequireQuestion] = useState(false);
    const navigate = useNavigate();

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...answers];
        newAnswers[index][field] = value;
        setAnswers(newAnswers);
    };

    const addAnswer = () => {
        setAnswers([...answers, { text: '', isCorrect: false }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newQuiz = { question, answers, RequireQuestion: requireQuestion };
            await axios.post('http://localhost:8000/practices', newQuiz);
            alert('Quiz created successfully!');
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Failed to create quiz.');
        }
    };

    return (
        <div className="form-parent">
            <h1 className="title">CREATE NEW QUESTION</h1>
            <form onSubmit={handleSubmit} className="form-child">
                <div className="form-group">
                    <label>Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answers:</label>
                    {answers.map((answer, index) => (
                        <div key={index} className="answer-group">
                            <input
                                type="text"
                                value={answer.text}
                                onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                                placeholder={`Answer ${index + 1}`}
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={answer.isCorrect}
                                    onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                                />
                                Correct
                            </label>
                        </div>
                    ))}
                    <button className='button' style={{ backgroundColor: "#7360df" }} type="button" onClick={addAnswer}>Add Answer</button>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={requireQuestion}
                            onChange={(e) => setRequireQuestion(e.target.checked)}
                        />
                        Require Question
                    </label>
                </div>
                <button type="submit" className="submit-button">CREATE QUIZ</button>
            </form>
        </div>
    );
};

export default CreateQuiz;