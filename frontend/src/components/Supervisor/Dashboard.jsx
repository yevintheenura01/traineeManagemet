import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalTrainees: 0,
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch dashboard data
  useEffect(() => {
    axios
      .get('http://localhost:5000/trainees/dashboard')
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      });
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex">
      {/* MenuBar */}
      <MenuBar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-green-50 text-gray-800 p-6 ml-[250px]">
        {/* Time and Date */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-blue-900">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-2xl font-bold text-green-800">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-600">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Dashboard
          </h2>
          {loading ? (
            <p className="text-green-700 text-lg">Loading...</p>
          ) : (
            <div>
              <p className="text-xl font-semibold text-green-800 mb-4">
                Total Trainees: {dashboardData.totalTrainees}
              </p>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Specializations:
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {dashboardData.categories.map((category) => (
                  <li
                    key={category._id}
                    className="text-gray-700"
                  >
                    <span className="font-medium text-blue-900">
                      {category._id}
                    </span>
                    : {category.count} trainee(s)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
