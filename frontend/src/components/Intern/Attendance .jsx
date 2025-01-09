import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Attendance = () => {
  const [sections] = useState({
    Python: ['Group 1', 'Group 2', 'Group 3'],
    Java: ['Group 1', 'Group 2'],
    JavaScript: ['Group 1', 'Group 2', 'Group 3', 'Group 4'],
    React: ['Group 1'],
  });
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [attendee, setAttendee] = useState({
    name: '',
    date: '',
    arrivalTime: '',
    departureTime: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set the name field with the logged-in user's firstName and lastName
  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      setAttendee((prev) => ({
        ...prev,
        name: `${firstName} ${lastName}`,
      }));
    }
  }, []);

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setSelectedGroup(''); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedSection || !selectedGroup || !attendee.name || !attendee.date || !attendee.arrivalTime) {
      alert('Please fill in all required fields!');
      return;
    }

    const attendanceData = {
      ...attendee,
      section: selectedSection,
      group: selectedGroup,
    };

    try {
      const response = await fetch('http://localhost:5000/api/submit-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        setIsSubmitted(true); 
        
        
        setAttendee({
          name: `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`,
          date: '',
          arrivalTime: '',
          departureTime: '',
        });
        setSelectedSection('');
        setSelectedGroup('');

       
        setTimeout(() => {
          setIsSubmitted(false);
        }, 20000);
      } else {
        alert('Failed to submit attendance. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('An error occurred while submitting attendance.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      {/* Header */}
      <Header />

      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        <main className="flex-grow p-8 bg-white rounded-lg shadow-md">
          <label className="text-xl font-semibold text-white bg-slt-sltGreenPrimary py-2 px-4 rounded-lg inline-block mb-6">
            Mark Attendance
          </label>

          
          {isSubmitted ? (
            <div className="flex justify-center items-center h-64 bg-slt-primary rounded-lg shadow-md text-2xl font-semibold text-center p-4">
              <div className="bg-slt-sltGreenPrimary w-full max-w-xs p-6 rounded-lg shadow-md">
                <p>Approval In Progress</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={attendee.name}
                onChange={handleInputChange}
                placeholder="Name"
                readOnly
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
              <input
                type="date"
                name="date"
                value={attendee.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                name="arrivalTime"
                value={attendee.arrivalTime}
                onChange={handleInputChange}
                placeholder="Arrival Time"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                name="departureTime"
                value={attendee.departureTime}
                onChange={handleInputChange}
                placeholder="Departure Time"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Section Selection */}
              <select
                value={selectedSection}
                onChange={handleSectionChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Section</option>
                {Object.keys(sections).map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>

              {/* Group Selection */}
              {selectedSection && (
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Group</option>
                  {sections[selectedSection].map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-slt-sltGreenPrimary text-white py-2 px-6 rounded-lg hover:bg-slt-sltGreenSecondary shadow-md"
              >
                Submit Attendance
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Attendance;
