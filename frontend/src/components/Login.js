import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/accounts', { username, password });
            localStorage.setItem('token', response.data.token);
            alert('Logged in successfully');
        } catch (err) {
            alert('Error logging in');
        }
    };

    return (
        <div> 
            <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
