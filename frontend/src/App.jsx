import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/Supervisor/CreateTrainee';
import Display from './components/Supervisor/DisplayTrainees';
import Login from './components/Login/Login';
import InternDashboard from './components/Intern/InternDashboard';
import Dashboard from './components/Supervisor/Dashboard';
import Attendance from './components/Supervisor/Attendance';

const App=()=> {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/display" element={<Display />} />
      <Route path="/create" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance />} />

      <Route path="/intern-dashboard" element={<InternDashboard />} />
      

    </Routes>
   </Router>
  );
};

export default App
