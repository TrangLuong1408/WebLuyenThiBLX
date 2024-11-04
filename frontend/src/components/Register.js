import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/register', { username, password, fullName, phoneNumber })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='form-parent'>
            <img className="logo" src="/img/registers.jpg" alt="logo" />
            <h1 className="title">Register</h1>
            <form className="form-child" onSubmit={handleSubmit} >
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
                <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                <button className="button" type="submit">Register</button>
            </form>
            <p className='p-style'>Already have an account? <a href="/login">LOGIN</a></p>
        </div>
    );
};

export default Register;