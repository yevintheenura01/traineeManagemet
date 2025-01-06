import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayTrainees = () => {
  const navigate = useNavigate();
  const [trainees, setTrainees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/trainees')
      .then((response) => {
        setTrainees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trainees:', error);
      });
  }, []);

  const filteredTrainees = trainees.filter((trainee) =>
    trainee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Trainee List</h2>
          <div className="space-x-2">
            <button
              onClick={() => navigate('/create')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Trainee
            </button>
            <button
              onClick={() => (window.location.href = 'http://localhost:5000/trainees/exportAll')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Export All
            </button>
            <button
              onClick={() => (window.location.href = 'http://localhost:5000/trainees/exportActive')}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Export Active
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">NIC</th>
              <th className="border px-4 py-2">Training Ends</th>
              <th className="border px-4 py-2">Institute</th>
              <th className="border px-4 py-2">Specializations</th>
              <th className="border px-4 py-2">Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainees.map((trainee) => (
              <tr key={trainee.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{trainee.id}</td>
                <td className="border px-4 py-2">{trainee.name}</td>
                <td className="border px-4 py-2">
                  {trainee.mobile} <br />
                  {trainee.email} <br />
                  {trainee.address}
                </td>
                <td className="border px-4 py-2">{trainee.nic}</td>
                <td className="border px-4 py-2">{trainee.trainingEndDate}</td>
                <td className="border px-4 py-2">{trainee.institute}</td>
                <td className="border px-4 py-2">{trainee.specializations}</td>
                <td className="border px-4 py-2">{trainee.supervisor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayTrainees;
