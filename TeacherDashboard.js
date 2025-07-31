import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Import this

function TeacherDashboard() {
  const navigate = useNavigate(); // <--- Hook for redirection

  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      name,
      subject,
      marks: Number(marks),
      status: Number(marks) >= 33 ? 'Pass' : 'Fail',
    };

    setStudents([...students, newStudent]);
    setName('');
    setSubject('');
    setMarks('');
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleLogout = () => {
    // Clear any auth state if needed
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📋 Teacher Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: 'gray', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {/* Add Student Form */}
      <form onSubmit={handleAddStudent} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Add Student
        </button>
      </form>

      {/* Student List */}
      <div style={{ marginTop: '30px' }}>
        <h3>Student List</h3>
        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {students.map((student) => (
              <li key={student.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                <strong>{student.name}</strong> - {student.subject} : {student.marks} marks →{' '}
                <span style={{ color: student.status === 'Pass' ? 'green' : 'red' }}>{student.status}</span>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
