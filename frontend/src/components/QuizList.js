import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/random-practices');
                setQuizzes(response.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);

    const handleAnswerChange = (quizId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [quizId]: answerId
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = userId; // Replace with actual user ID
        const answers = Object.keys(selectedAnswers).map(quizId => {
            const quiz = quizzes.find(q => q._id === quizId);
            if (!quiz) {
                console.error(`Quiz with ID ${quizId} not found`);
                return null;
            }
            const selectedAnswer = quiz.answers.find(a => a._id === selectedAnswers[quizId]);
            if (!selectedAnswer) {
                console.error(`Selected answer for quiz ID ${quizId} not found`);
                return null;
            }
            return {
                practice: quizId,               // Practice (quiz) ID
                selectedAnswer: selectedAnswer.text // Only the selected answer text
            };
        }).filter(answer => answer !== null); // Filter out any null values

        try {
            const response = await axios.post('http://localhost:8000/results', { user, answers });
            alert('Result saved successfully!');
            navigate(`/result/${response.data._id}`);
        } catch (error) {
            console.error('Error saving result:', error);
            alert('Failed to save result.');
        }
    };

    return (
        <div className="quiz-container">
            <h1 className="title">THI BẰNG LÁI XE MÁY</h1>
            <form onSubmit={handleSubmit}>
                <ul className="quiz-list">
                    {quizzes.map((quiz) => (
                        <li key={quiz._id} className="quiz-item">
                            <h3 className="quiz-question">{quiz.question}</h3>
                            <ul className="quiz-answers">
                                {quiz.answers.map((answer) => (
                                    <li key={answer._id} className="quiz-answer">
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question-${quiz._id}`}
                                                value={answer._id}
                                                onChange={() => handleAnswerChange(quiz._id, answer._id)}
                                            />
                                            {answer.text}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <button className="submit-button" >
                    <Link to="/login" >SUBMIT</Link>
                </button>
            </form>
        </div>
    );
};

export default QuizList;
