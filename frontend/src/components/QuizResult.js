import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const QuizResult = () => {
    const { resultId } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/results/${resultId}`);
                setResult(response.data);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        };
        fetchResult();
    }, [resultId]);

    if (!result) {
        return <div>Loading...</div>;
    }

    return (
        <div className="result-container">
            <h1 className="title">KẾT QUẢ THI</h1>
            <p className="result-score">Score: {result.score}/25</p>
            <ul className="result-list">
                {result.answers.map((answer) => (
                    <li key={answer._id} className="result-item">
                        <h3 className="result-question">{answer.practice.question}</h3>
                        <ul className="result-answers">
                            {answer.practice.answers.map((ans) => (
                                <li key={ans._id} className={`result-answer ${ans.isCorrect ? 'correct' : 'incorrect'}`}>
                                    {ans.text}
                                    {answer.selectedAnswer === ans.text && <span> ✅</span>}

                                </li>
                            ))}
                        </ul>
                        <p className="result-selected-answer">
                            <strong>Your Answer:</strong> {answer.selectedAnswer} {answer.isCorrect ? "(Correct)" : "(Incorrect)"}
                        </p>
                        {!answer.isCorrect && (
                            <p className="result-correct-answer">
                                <strong>Correct Answer:</strong> {answer.practice.answers.find(a => a.isCorrect).text}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
            <button className="button" type="button">
                <Link className="link" to="/home">HOME</Link>
                </button>
        </div>
    );
};

export default QuizResult;