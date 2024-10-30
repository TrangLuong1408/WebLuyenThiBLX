import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', { username, password })
        .then(result => {console.log(result)
            alert(result.data.message);
            if(result.data.message === "Successful") {
                
        navigate('/home')
            }
        })   
        .catch (err => console.log(err))
    };

    return (
        <div> 
            <img className="logo" src="/img/download (1).jpg" alt="logo" />
            <h1 className="title">LOGIN</h1>
        <form className="form-login" onSubmit={handleSubmit}>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /> 
            <button className="button" type="submit">LOGIN</button>
        </form>
        <p>Don't have an account? <a href="/register">REGISTER</a></p>
        </div>
    );
};

export default Login;
