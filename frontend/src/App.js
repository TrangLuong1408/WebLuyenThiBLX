import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
import QuizList from './components/QuizList';
import Sahinh from './components/Sahinh';
import ManHinhThi from './components/ManHinhThi';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Route đến trang Login */}
                    {/* <Route path="/login" element={<Login />} /> */}

                    {/* Route đến trang luyện thi */}
                    <Route path="/OnLuyenAll" element={<QuizList />} />

                    <Route path="/sahinh" element={<Sahinh />} />

                    <Route path="/manhinhthi" element={<ManHinhThi />} />

                    {/* Route đến trang Admin (Chỉ dành cho Admin) */}
                    {/* <Route path="/admin" element={<ProtectedRoute isAdmin={true}><AdminDashboard /></ProtectedRoute>} /> */}

                    {/* Route mặc định */}
                    {/* <Route path="/" element={<Login />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

