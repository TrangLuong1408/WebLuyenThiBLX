import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1 className="title">ÔN THI BẰNG LÁI XE MÁY</h1>
            <div className="button-container">
                <Link to="/onluyenthi" className="home-button">ÔN THI THEO ĐỀ</Link>
                <Link to="/sahinh" className="home-button">SA HÌNH</Link>
                <Link to="/manhinhthi" className="home-button large-button">HƯỚNG DẪN THI</Link>
            </div>
        </div>
    );
};

export default Home;
