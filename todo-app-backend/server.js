const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let tasks = [];
let currentId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

app.post('/tasks', (req, res) => {
  const task = { ...req.body, id: currentId++ };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id == req.params.id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...req.body, id: parseInt(req.params.id) };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).send('Task not found');
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id == req.params.id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
