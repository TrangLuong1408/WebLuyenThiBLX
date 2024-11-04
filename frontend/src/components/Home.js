import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Lấy đối tượng user từ localStorage
        setIsLoggedIn(!!user); // Chuyển đổi thành Boolean: nếu user tồn tại, isLoggedIn sẽ là true
    }, []);
    
    

    return (
        <Container>
            <Row style={{backgroundColor: "#33186B"}}> 
            {isLoggedIn ? (
                    <Link className="link" to="/logout">LOG OUT</Link>
                ) : (
                    <>
                    <Col md={1}>
                        <Link className="link" to="/">REGISTER</Link> </Col>
                        <Col md={1}>
                        <Link className="link" to="/login">LOGIN</Link> </Col>
                    </>
                )}
            </Row>
            <Row style={{ paddingTop: "320px" }}>
                <h1 className="title">ÔN THI BẰNG LÁI XE MÁY</h1>
                <div className="button-container">
                    <Link to="/onluyenthi" className="home-button">ÔN THI THEO ĐỀ</Link>
                    <Link to="/sahinh" className="home-button">SA HÌNH</Link>
                    <Link to="/manhinhthi" className="home-button">HƯỚNG DẪN THI</Link>
                    <Link to="/user/results" className="home-button large-button">XEM KẾT QUẢ</Link>
                </div>
            </Row>
        </Container>
    );
};

export default Home;
