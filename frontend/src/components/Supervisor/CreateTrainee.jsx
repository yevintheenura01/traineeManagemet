import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  id: '',
  name: '',
  mobile: '',
  nic: '',
  email: '',
  address: '',
  trainingStartDate: '',
  trainingEndDate: '',
  institute: '',
  languages: '',
  specializations: '',
  supervisor: '',
  assignedWork: '',
  targetDate: '',
};

const CreateTrainee = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/trainees', formData);
      if (response.status === 201) {
        alert('Trainee created successfully');
        navigate('/');
      } else {
        throw new Error('Failed to create trainee');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-lg">
          <h2 className="text-3xl font-bold text-center">Create Trainee</h2>
          <p className="text-center mt-2">Enter trainee details to add them to the system</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Trainee ID', name: 'id', type: 'text' },
              { label: 'Trainee Name', name: 'name', type: 'text' },
              { label: 'Mobile', name: 'mobile', type: 'text' },
              { label: 'NIC', name: 'nic', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'Training Start Date', name: 'trainingStartDate', type: 'date' },
              { label: 'Training End Date', name: 'trainingEndDate', type: 'date' },
              { label: 'Institute', name: 'institute', type: 'text' },
              { label: 'Languages', name: 'languages', type: 'text' },
              { label: 'Assigned Work', name: 'assignedWork', type: 'text' },
              { label: 'Target Date', name: 'targetDate', type: 'date' },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700 font-medium">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Specializations</label>
              <select
                name="specializations"
                value={formData.specializations}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Specialization</option>
                <option value="AI">AI</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Supervisor</label>
              <select
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Supervisor</option>
                <option value="kasun">Mr. Kasun</option>
                <option value="sadun">Mr. Sadun</option>
                <option value="Thilina">Mr. Thilina</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
          >
            Create Trainee
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrainee;
