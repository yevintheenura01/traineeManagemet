import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar'; // Import the MenuBar component

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
                alert(response.data.message); // Show success message from backend
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
      <MenuBar /> {/* Add the menu bar */}
      <div className="flex-1 min-h-screen bg-gray-50 text-gray-800 p-6 ml-[250px]">
        {/* Adjust the margin to account for the MenuBar width */}
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Trainee List</h2>
            <div className="space-x-2">
              <button
                onClick={() =>
                  (window.location.href = 'http://localhost:5000/trainees/exportAll')
                }
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Export All
              </button>
              <button
                onClick={() =>
                  (window.location.href = 'http://localhost:5000/trainees/exportActive')
                }
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
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainees.map((trainee) => (
                <tr key={trainee.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{trainee._id}</td>
                  <td className="border px-4 py-2">{trainee.firstName}</td>
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
                  <td className="border px-4 py-2 space-y-2">
                    <button
                      onClick={() => navigate(`/edit/${trainee.id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainee._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
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
