import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './index.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', age: 20, course: 'Computer Science' },
    { id: 2, name: 'Bob Smith', age: 17, course: 'Arts & Humanities' }
  ]);

  const handleAddStudent = async (newStudent) => {
    // Simulate an async backend API interaction delay
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents((prev) => [newStudent, ...prev]);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="app-container">
      <div style={{ gridColumn: '1 / -1' }}>
        <h1 className="app-title">EduManage</h1>
        <p className="subtitle">Modern Student Information System</p>
      </div>
      
      <div>
        <StudentForm onAddStudent={handleAddStudent} />
      </div>
      
      <div>
        <StudentList students={students} />
      </div>
    </div>
  );
}

export default App;
