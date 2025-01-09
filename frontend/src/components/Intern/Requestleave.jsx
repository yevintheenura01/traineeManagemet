import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const RequestLeave = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    medicalReport: null, // For storing the file
  });
  const [status, setStatus] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  // Handle file upload (for medical report)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLeaveData({ ...leaveData, medicalReport: file });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    
    setStatus('Pending admin approval');
    
   
    setLeaveData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      medicalReport: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        
        <div className="flex flex-col items-center justify-center w-full bg-white p-8 rounded-lg shadow-lg mx-4 mt-8">

          
          {status && (
            <div className="w-full max-w-lg bg-yellow-100 text-lg font-medium text-yellow-600 p-4 rounded-lg shadow-md mb-6">
              {status}
            </div>
          )}

         
          <label className="text-2xl font-semibold text-white bg-green-600 py-2 px-4 rounded-lg inline-block mb-6">
            Request Leave
          </label>

          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
            
            <div className="flex space-x-6">
              {/* Leave Type */}
              <div className="flex flex-col w-1/2">
                <label className="text-gray-700 text-lg font-medium">Leave Type</label>
                <select
                  name="leaveType"
                  value={leaveData.leaveType}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Casual Leave">Casual Leave</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="flex flex-col w-1/2">
                <label className="text-gray-700 text-lg font-medium">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={leaveData.startDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-lg font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={leaveData.endDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* Reason for Leave */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-lg font-medium">Reason</label>
              <textarea
                name="reason"
                value={leaveData.reason}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Upload Medical Report (PDF) */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-lg font-medium">Upload Medical Report (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300"
                required={leaveData.leaveType === 'Sick Leave'} // Conditional 'required' attribute
              />
             
              {leaveData.medicalReport && (
                <p className="mt-2 text-gray-500 text-sm">{leaveData.medicalReport.name}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;
