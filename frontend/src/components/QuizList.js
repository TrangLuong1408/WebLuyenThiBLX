import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await axios.get('http://localhost:8000/OnLuyenAll');
            setQuizzes(response.data);
        };
        fetchQuizzes();
    }, []);

    return (
        <div>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <h3>Câu hoi: {quiz.question}</h3>
                        <ul>
                            {quiz.options.map((option, index) => (
                                <li key={index}>{option.text}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
        
    );
};

export default QuizList;
