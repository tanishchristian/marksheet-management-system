// Add this below login route
let students = [
  { id: 1, name: 'Ram', rollNo: '101', subject: 'Math', marks: 88 },
  { id: 2, name: 'Shyam', rollNo: '102', subject: 'Science', marks: 92 },
];

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Add new student
app.post('/api/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  students = students.map((student) =>
    student.id == id ? { ...student, ...req.body } : student
  );
  res.json({ message: 'Student updated' });
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  students = students.filter((student) => student.id != id);
  res.json({ message: 'Student deleted' });
});
