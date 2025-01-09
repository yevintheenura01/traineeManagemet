import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainee?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/trainees/${id}`);
        if (response.status === 200) {
          alert(response.data.message);
          setTrainees((prev) => prev.filter((trainee) => trainee._id !== id));
        } else {
          alert('Failed to delete trainee.');
        }
      } catch (error) {
        console.error('Error deleting trainee:', error);
        alert('Error deleting trainee.');
      }
    }
  };

  const filteredTrainees = trainees.filter((trainee) =>
    trainee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <MenuBar />
      <div className="flex-1 min-h-screen bg-gray-50 text-gray-800 p-6 ml-[250px]">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Trainee List</h2>
            <div className="space-x-3">
              <button
                onClick={() =>
                  (window.location.href = 'http://localhost:5000/trainees/exportAll')
                }
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Export All
              </button>
              <button
                onClick={() =>
                  (window.location.href = 'http://localhost:5000/trainees/exportActive')
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Export Active
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
          />

          {/* Trainee Table */}
          <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {['ID', 'Name', 'Contact', 'NIC', 'Training Ends', 'Institute', 'Specializations', 'Supervisor', 'Actions'].map(
                  (header, index) => (
                    <th key={index} className="border px-4 py-2 text-left text-gray-800 font-semibold">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTrainees.map((trainee) => (
                <tr key={trainee._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{trainee._id}</td>
                  <td className="border px-4 py-2">{trainee.firstName}</td>
                  <td className="border px-4 py-2">
                    {trainee.mobile} <br />
                    {trainee.email}
                  </td>
                  <td className="border px-4 py-2">{trainee.nic}</td>
                  <td className="border px-4 py-2">{trainee.trainingEndDate}</td>
                  <td className="border px-4 py-2">{trainee.institute}</td>
                  <td className="border px-4 py-2">{trainee.specializations}</td>
                  <td className="border px-4 py-2">{trainee.supervisor}</td>
                  <td className="border px-4 py-2 space-y-2">
                    <button
                      onClick={() => navigate(`/edit/${trainee._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainee._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayTrainees;
