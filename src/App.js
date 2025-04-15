import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import StudentLogin from './student_login';

function App() { 
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/student-login" element={<StudentLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
