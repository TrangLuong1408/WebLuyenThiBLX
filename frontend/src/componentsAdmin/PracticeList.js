import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PracticeList = () => {
    const [practices, setPractices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPractices, setFilteredPractices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPractices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/practices');
                setPractices(response.data);
                setFilteredPractices(response.data);
            } catch (error) {
                console.error("Error fetching practices:", error);
            }
        };
        fetchPractices();
    }, []);

    useEffect(() => {
        const filtered = practices.filter(practice =>
            practice.question.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPractices(filtered);
    }, [searchQuery, practices]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this practice?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/practices/${id}`);
                setPractices(practices.filter(practice => practice._id !== id));
                setFilteredPractices(filteredPractices.filter(practice => practice._id !== id));
            } catch (error) {
                console.error('Error deleting practice:', error);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-practice/${id}`);
    };

    const handleAdd = () => {
        navigate('/create-quiz');
    };

    if (practices.length === 0) {
        return <div>No practices found.</div>;
    }
    if (
        JSON.parse(localStorage.getItem("user")) != null &&
        JSON.parse(localStorage.getItem("user")).role === "admin"
      ) {
    return (
        <div className="container mt-5">
             <button className="button" type="button">
                <Link className="link" to="/logout">LOG OUT</Link>
                </button>
            <h1 className="title">ALL QUESTIONS</h1>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by question"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={handleAdd}>Add Practice</button>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Question</th>
                        <th>Answers</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPractices.map(practice => (
                        <tr key={practice._id}>
                             <td>
                                {practice.question}
                                {practice.RequireQuestion && (
                                    <span className="text-danger"> (câu điểm liệt)</span>
                                )}
                            </td>
                            <td>
                                <ul className="list-unstyled">
                                    {practice.answers.map(answer => (
                                        <li key={answer._id} className={`practice-answer ${answer.isCorrect ? 'text-success' : 'text-danger'}`}>
                                            {answer.text}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button className="btn btn-warning mr-2" onClick={() => handleEdit(practice._id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(practice._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} else {
    return <div>Access Denied</div>;
  }
};

export default PracticeList;