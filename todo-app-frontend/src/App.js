import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (title && description && dueDate) {
      try {
        const newTask = { title, description, status, dueDate };
        const response = await axios.post('http://localhost:3001/tasks', newTask);
        setTasks([...tasks, response.data]);
        setTitle('');
        setDescription('');
        setStatus('pending');
        setDueDate('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const updateTask = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      try {
        const updatedTask = { ...taskToUpdate, status: taskToUpdate.status === 'pending' ? 'completed' : 'pending' };
        const response = await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask);
        setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={() => updateTask(task.id)}>Toggle Status</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
