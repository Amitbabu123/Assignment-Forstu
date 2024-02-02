import React, { useState, useEffect } from 'react';
import './App.css';
import DynamicFormBuilder from './components/viewpage';
import SummaryDisplay from './components/SummaryDisplay';

function App() {
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    setStudentData({
      name: 'John Doe',
      email: 'john.doe@example.com',
      enrollmentDate: '2022-01-01',
    });
  }, []);

  return (
    <div className="container-fluid bg-primary text-light py-4"> 
      <div className="row">
        <div className="col-md-6">
          <DynamicFormBuilder studentData={studentData} />
        </div>
        <div className="col-md-6">
          <SummaryDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
