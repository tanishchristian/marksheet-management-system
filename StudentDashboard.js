// src/pages/StudentDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const navigate = useNavigate();

  // Sample student data (static, no DB)
  const student = {
    name: 'Rahul Sharma',
    marks: {
      math: 78,
      science: 84,
      english: 65,
    },
  };

  const total = student.marks.math + student.marks.science + student.marks.english;
  const percentage = (total / 300) * 100;
  const isPass = student.marks.math >= 35 && student.marks.science >= 35 && student.marks.english >= 35;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Student Dashboard</h2>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Math:</strong> {student.marks.math}</p>
        <p><strong>Science:</strong> {student.marks.science}</p>
        <p><strong>English:</strong> {student.marks.english}</p>
        <p><strong>Total:</strong> {total} / 300</p>
        <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
        <p style={{ color: isPass ? 'green' : 'red' }}>
          <strong>Result:</strong> {isPass ? 'Pass ✅' : 'Fail ❌'}
        </p>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '350px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  logout: {
    marginTop: '20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    cursor: 'pointer',
  },
};

export default StudentDashboard;
