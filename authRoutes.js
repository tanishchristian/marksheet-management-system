const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/students.json');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const user = data.users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Don't send password in response
  const { password: _, ...safeUser } = user;

  res.json({ message: 'Login successful', user: safeUser });
});

router.get('/students', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const students = data.users.filter(u => u.role === 'student');
  res.json(students);
});

router.post('/students', (req, res) => {
  const newStudent = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  data.users.push(newStudent);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

  res.json({ message: 'Student added successfully' });
});

router.put('/students/:rollNo', (req, res) => {
  const { rollNo } = req.params;
  const updatedData = req.body;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const studentIndex = data.users.findIndex(
    u => u.role === 'student' && u.rollNo === rollNo
  );

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  data.users[studentIndex] = {
    ...data.users[studentIndex],
    ...updatedData
  };

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

  res.json({ message: 'Student updated successfully' });
});

router.delete('/students/:rollNo', (req, res) => {
  const { rollNo } = req.params;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const newUsers = data.users.filter(
    u => !(u.role === 'student' && u.rollNo === rollNo)
  );

  data.users = newUsers;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

  res.json({ message: 'Student deleted successfully' });
});

module.exports = router;
