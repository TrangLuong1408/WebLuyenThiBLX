import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "./showmodal.css";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState(() => {
        const savedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
        const expirationTime = localStorage.getItem("quizzesExpiration");
        if (savedQuizzes && expirationTime && new Date().getTime() < expirationTime) {
            return savedQuizzes;
        }
        localStorage.removeItem("quizzes");
        localStorage.removeItem("quizzesExpiration");
        return [];
    });

    const [selectedAnswers, setSelectedAnswers] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedAnswers")) || {};
    });
    const [remainingTime, setRemainingTime] = useState(parseInt(localStorage.getItem("remainingTime")) || 15);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (!quizzes.length) {
                try {
                    const response = await axios.get('http://localhost:8000/random-practices');
                    setQuizzes(response.data);
                    localStorage.setItem("quizzes", JSON.stringify(response.data));
                    localStorage.setItem("quizzesExpiration", new Date().getTime() + remainingTime * 1000);
                } catch (error) {
                    console.error("Error fetching quizzes:", error);
                }
            }
        };
        fetchQuizzes();
    }, [quizzes.length, remainingTime]);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime(prevTime => {
                    const newTime = prevTime - 1;
                    localStorage.setItem("remainingTime", newTime);
                    return newTime;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            handleSubmit();
        }
    }, [remainingTime]);

    const handleAnswerChange = (quizId, answerText) => {
        const updatedAnswers = {
            ...selectedAnswers,
            [quizId]: answerText
        };
        setSelectedAnswers(updatedAnswers);
        localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        const answers = quizzes.map(quiz => {
            const selectedAnswerText = selectedAnswers[quiz._id];
            return {
                practice: quiz._id,
                selectedAnswer: selectedAnswerText ? selectedAnswerText : "Chưa chọn đáp án"
            };
        });

        try {
            const response = await axios.post('http://localhost:8000/results', { user: userId, answers });
            alert('Kết quả đã được lưu thành công!');
            localStorage.removeItem("remainingTime");
            localStorage.removeItem("quizzes");
            localStorage.removeItem("quizzesExpiration");
            localStorage.removeItem("selectedAnswers");
            navigate(`/result/${response.data._id}`);
        } catch (error) {
            console.error('Lỗi khi lưu kết quả:', error);
            alert('Không thể lưu kết quả.');
        }
    };

    const handleNewQuiz = async () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn tạo bài thi mới? Các câu trả lời hiện tại sẽ không được lưu.");
        if (confirmed) {
            setSelectedAnswers({});
            setRemainingTime(15);
            localStorage.removeItem("remainingTime");
            localStorage.removeItem("quizzes");
            localStorage.removeItem("quizzesExpiration");
            localStorage.removeItem("selectedAnswers");
            setQuizzes([]);

            try {
                const response = await axios.get('http://localhost:8000/random-practices');
                setQuizzes(response.data);
                localStorage.setItem("quizzes", JSON.stringify(response.data));
                localStorage.setItem("quizzesExpiration", new Date().getTime() + remainingTime * 1000);
            } catch (error) {
                console.error("Error fetching new quizzes:", error);
            }
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    

    return (
        <div className="quiz-container">
            <h1 className="title">THI BẰNG LÁI XE MÁY</h1>
            <div className="timer">Thời gian còn lại: {formatTime(remainingTime)}</div>
            <button className="submit-button" onClick={handleNewQuiz}>TẠO BÀI MỚI</button>
            <form onSubmit={handleSubmit}>
                <ul className="quiz-list">
                    {quizzes.map((quiz) => (
                        <li key={quiz._id} className="quiz-item">
                            <h3 className="quiz-question">{quiz.question}</h3>
                            <ul className="quiz-answers">
                                {quiz.answers.map((answer) => (
                                    <li key={`${quiz._id}-${Math.random()}`} className="quiz-answer">
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question-${quiz._id}`}
                                                value={answer.text}
                                                checked={selectedAnswers[quiz._id] === answer.text}
                                                onChange={() => handleAnswerChange(quiz._id, answer.text)}
                                            />
                                            {answer.text}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <button className="submit-button" type="submit">NỘP BÀI</button>
            </form>
          
        </div>
    );
};

export default QuizList;  