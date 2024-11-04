import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:8000/login', { username, password });
            alert(result.data.message);
            if (result.data.message === "Login successful!") {
                const user = result.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                if (user.role === 'customer') {
                    navigate("/home");
                } else if (user.role === 'admin') {
                    navigate("/dashboard");
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
// console.log(JSON.parse(sessionStorage.getItem("user")));
    return (
        <div className='form-parent'>
            <img className="logo" src="/img/download (1).jpg" alt="logo" />
            <h1 className="title">LOGIN</h1>
            <form className="form-child" onSubmit={handleSubmit}>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className="button" type="submit">LOGIN</button>
            </form>
            <p className='p-style'>Don't have an account? <a href="/">REGISTER</a></p>
        </div>
    );
};

export default Login;