import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalTrainees: 0,
    categories: [],
  });
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex">
    {/* MenuBar */}
    <MenuBar />

    {/* Main Content */}
    <div className="flex-1 min-h-screen bg-gray-50 text-gray-800 p-6 ml-[250px]">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="text-xl font-semibold mb-4">
              Total Trainees: {dashboardData.totalTrainees}
            </p>
            <h3 className="text-lg font-semibold mb-2">Specializations:</h3>
            <ul className="list-disc list-inside space-y-2">
              {dashboardData.categories.map((category) => (
                <li key={category._id}>
                  {category._id}: {category.count} trainee(s)
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
