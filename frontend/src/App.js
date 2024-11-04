import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import QuizList from './components/QuizList';
import Sahinh from './components/Sahinh';
import ManHinhThi from './components/ManHinhThi';
import Home from './components/Home';
import Register from './components/Register';
import QuizResult from './components/QuizResult';
import UserResults from './components/UserResult';
import Logout from './components/Logout';
import CreateQuiz from './componentsAdmin/CreateQuiz';
import PracticeList from './componentsAdmin/PracticeList';
import EditQuiz from './componentsAdmin/EditQuiz';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>

                    {/* Route đầu trang Register */}
                    <Route path="/" element={<Register/>} />
                    {/* Route đến trang Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Route to Home */}
                    <Route path="/home" element={<Home />} />

                    {/* Route đến trang luyện thi */}
                    <Route path="/onluyenthi" element={<QuizList />} />

                    <Route path="/sahinh" element={<Sahinh />} />

                    <Route path="/manhinhthi" element={<ManHinhThi />} />

                    <Route path="/result/:resultId" element={<QuizResult />} />

                    <Route path="/user/results" element={<UserResults/>} />

                    <Route path="/logout" element={<Logout />} />

                    <Route path="/dashboard" element={<PracticeList />} />
                    <Route path="/create-quiz" element={<CreateQuiz />} />
                    <Route path="/edit-practice/:id" element={<EditQuiz />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

