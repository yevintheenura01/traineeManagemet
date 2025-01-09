import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/Supervisor/CreateTrainee';
import Display from './components/Supervisor/DisplayTrainees';
import Login from './components/Login/Login';
import InternDashboard from './components/Intern/InternDashboard';
import Dashboard from './components/Supervisor/Dashboard';
import SupAttendance from './components/Supervisor/SupAttendance';
import EditTrainee from './components/Supervisor/EditTrainee';

import Attendance from './components/Intern/Attendance ';
import InternsProfile from './components/Intern/Profile';
import RequestLeave from './components/Intern/Requestleave';

const App=()=> {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/display" element={<Display />} />
      <Route path="/create" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/supAttendance" element={<SupAttendance />} />
      <Route path="/edit/:id" element={<EditTrainee />} />

      <Route path="/intern-dashboard" element={<InternDashboard />} />
      <Route path="/InternsProfile" element={<InternsProfile />} />
      <Route path="/Requestleave" element={<RequestLeave />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
   </Router>
  );
};

export default App
