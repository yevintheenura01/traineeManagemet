import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayTrainees = () => {
    const navigate = useNavigate();
    const [trainees, setTrainees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch trainees data from the backend using Axios
        axios.get('http://localhost:5000/trainees')
            .then(response => {
                setTrainees(response.data);
            })
            .catch(error => {
                console.error('Error fetching trainees:', error);
            });
    }, []);

    const handleAddTrainee = () => {
        navigate('/create');
    };

    const handleExportAll = () => {
        window.location.href = '/api/trainees/exportAll';
    };

    const handleExportActive = () => {
        window.location.href = '/api/trainees/exportActive';
    };

    const filteredTrainees = trainees.filter(trainee =>
        trainee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Trainee List</h2>
            <div>
                <button onClick={handleAddTrainee}>Add Trainee</button>
                <button onClick={handleExportAll}>Export All Trainees</button>
                <button onClick={handleExportActive}>Export Active Trainees</button>
            </div>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTrainees.map(trainee => (
                        <tr key={trainee.id}>
                            <td>{trainee.id}</td>
                            <td>{trainee.name}</td>
                            <td>{trainee.mobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayTrainees;
