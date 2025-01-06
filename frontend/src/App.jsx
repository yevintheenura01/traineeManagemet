import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/Supervisor/CreateTrainee';
import Display from './components/Supervisor/DisplayTrainees';
const App=()=> {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Display />} />
      <Route path="/create" element={<Create />} />
    </Routes>
   </Router>
  );
};

export default App
