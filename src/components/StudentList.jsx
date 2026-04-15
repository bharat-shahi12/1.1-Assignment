import React, { useState } from 'react';

const StudentList = ({ students }) => {
  const [filter, setFilter] = useState('All'); // 'All', 'Adults', 'Minors'
  const [courseFilter, setCourseFilter] = useState('All');

  const getFilteredStudents = () => {
    let result = students;

    // Age filter logic
    if (filter === 'Adults') {
      result = result.filter((s) => s.age >= 18);
    } else if (filter === 'Minors') {
      result = result.filter((s) => s.age < 18);
    }

    // Course filter logic
    if (courseFilter !== 'All') {
      result = result.filter((s) => s.course === courseFilter);
    }

    return result;
  };

  const filteredStudents = getFilteredStudents();
  
  // Extract unique courses for the dropdown dynamically based on available students
  const uniqueCourses = ['All', ...new Set(students.map(s => s.course))];

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Student Roster</h2>
      
      <div className="filter-controls">
        <div>
          <button 
            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All Students
          </button>
          <button 
            className={`filter-btn ${filter === 'Adults' ? 'active' : ''}`}
            onClick={() => setFilter('Adults')}
            style={{ marginLeft: '0.5rem' }}
          >
            18 and above
          </button>
          <button 
            className={`filter-btn ${filter === 'Minors' ? 'active' : ''}`}
            onClick={() => setFilter('Minors')}
            style={{ marginLeft: '0.5rem' }}
          >
            Under 18
          </button>
        </div>
        
        {students.length > 0 && (
          <select 
            className="form-select" 
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            {uniqueCourses.map(course => (
              <option key={course} value={course}>
                {course === 'All' ? 'All Courses' : course}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="students-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-header">
                <span className="student-name">{student.name}</span>
                <span className={`student-age ${student.age >= 18 ? 'adult' : ''}`}>
                  {student.age} yrs
                </span>
              </div>
              <span className="student-course">{student.course}</span>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p>{students.length === 0 ? "No students added yet. Add one from the form." : "No students match the current filters."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
