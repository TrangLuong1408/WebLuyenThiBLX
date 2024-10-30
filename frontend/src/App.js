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

const App = () => {
    return (
        <Router>
            <div>
                <Routes>

                    {/* Route đầu trang Register */}
                    <Route path="/register" element={<Register/>} />
                    {/* Route đến trang Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Route to Home */}
                    <Route path="/home" element={<Home />} />

                    {/* Route đến trang luyện thi */}
                    <Route path="/onluyenthi" element={<QuizList />} />

                    <Route path="/sahinh" element={<Sahinh />} />

                    <Route path="/manhinhthi" element={<ManHinhThi />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;

