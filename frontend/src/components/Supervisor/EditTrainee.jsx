import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTrainee = () => {
  const { id } = useParams(); // Get trainee ID from URL
  const navigate = useNavigate();
  const [traineeData, setTraineeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    trainingStartDate: '',
    trainingEndDate: '',
    institute: '',
    languages: '',
    specializations: '',
    supervisor: '',
    assignedWork: '',
    targetDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the trainee details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/trainees/${id}`)
      .then((response) => {
        setTraineeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch trainee details.');
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraineeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/trainees/${id}`, traineeData)
      .then(() => {
        alert('Trainee updated successfully!');
        navigate('/trainees'); // Redirect to trainees list page
      })
      .catch((error) => {
        alert('Failed to update trainee.');
        console.error('Error updating trainee:', error);
      });
  };

  if (loading) return <p className="text-center text-gray-600">Loading trainee details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Trainee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={traineeData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={traineeData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={traineeData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={traineeData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={traineeData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Training Start Date</label>
            <input
              type="date"
              name="trainingStartDate"
              value={traineeData.trainingStartDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Training End Date</label>
            <input
              type="date"
              name="trainingEndDate"
              value={traineeData.trainingEndDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Institute</label>
            <input
              type="text"
              name="institute"
              value={traineeData.institute}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Languages</label>
            <input
              type="text"
              name="languages"
              value={traineeData.languages}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Comma-separated"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Specializations</label>
            <input
              type="text"
              name="specializations"
              value={traineeData.specializations}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Comma-separated"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Supervisor</label>
            <select
              name="supervisor"
              value={traineeData.supervisor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Supervisor</option>
              <option value="kasun">Mr. Kasun</option>
              <option value="sadun">Mr. Sadun</option>
              <option value="Thilina">Mr. Thilina</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Assigned Work</label>
            <input
              type="text"
              name="assignedWork"
              value={traineeData.assignedWork}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Target Date</label>
            <input
              type="date"
              name="targetDate"
              value={traineeData.targetDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/trainees')}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainee;
