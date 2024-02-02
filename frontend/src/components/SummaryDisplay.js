import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryDisplay = () => {
  const [scholarshipAssignments, setScholarshipAssignments] = useState([]);

  useEffect(() => {
    // Fetch scholarship assignments from the backend
    const fetchScholarshipAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scholarship-assignments');
        setScholarshipAssignments(response.data);
      } catch (error) {
        console.error('Error fetching scholarship assignments:', error);
      }
    };

    fetchScholarshipAssignments();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Scholarship Assignments</h2>
      <ul className="list-group">
        {scholarshipAssignments.map((assignment) => (
          <li key={assignment.studentId} className="list-group-item">
            <strong>{assignment.studentName}</strong> - {assignment.scholarshipType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryDisplay;
