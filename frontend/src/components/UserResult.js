import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserResults = () => {
   
    const [results, setResults] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
    console.log(user);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/results/user/${userId}`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchResults();
    }, [userId]);

    if (results.length === 0) {
        return <div>No results found for this user.</div>;
    }

    return (
        <div className="results-container">
            <h1 className="title">USER RESULTS</h1>
            <ul className="results-list">
                {results.map(result => (
                    <li key={result._id} className="result-item">
                        <p><strong>Result ID:</strong> {result._id}</p>
                        <p><strong>Score:</strong> {result.score}/25</p>
                        <p><strong>Date:</strong> {new Date(result.createdAt).toLocaleString()}</p>
                        <a href={`/result/${result._id}`} className="result-link">View Details</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserResults;