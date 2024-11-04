import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const QuizContext = createContext();
const QuizProvider = ({children}) => {
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await axios.get('http://localhost:8000/practices');
            setQuizzes(response.data);
        };
        fetchQuizzes();
    }, []);

    const addQuiz = async (quiz) => {
        const response = await axios.post('http://localhost:8000/practices', quiz);
        setQuizzes([...quizzes, response.data]);
    };
  

  return (
    <QuizContext.Provider value= {{ quizzes, addQuiz}}>
        {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;