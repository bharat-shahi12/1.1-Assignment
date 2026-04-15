import React, { useState } from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({ name: '', age: '', course: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.course) {
      setError('All fields are required.');
      return;
    }
    
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      setError('Please enter a valid age.');
      return;
    }

    setIsSubmitting(true);
    // Simulate async submission logic via passed prop function
    try {
      await onAddStudent({ ...formData, age: ageNum, id: Date.now() });
      setFormData({ name: '', age: '', course: '' });
    } catch (err) {
      setError('Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="age">Age</label>
          <input
            className="form-input"
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 20"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="course">Course</label>
          <select 
            className="form-select"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select a course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Arts & Humanities">Arts & Humanities</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="loader"></span> Saving...</>
          ) : (
            'Add Student'
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
