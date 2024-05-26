import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const TaskForm = ({ task, setEditingTask, setTasks }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && task.id) {
      axios.put(`http://localhost:3001/tasks/${task.id}`, formData)
        .then(response => {
          setTasks(tasks => tasks.map(t => t.id === task.id ? response.data : t));
          setEditingTask(null);
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:3001/tasks', formData)
        .then(response => {
          setTasks(tasks => [...tasks, response.data]);
          setEditingTask(null);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>
        Due Date:
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
      </label>
      <button type="submit">Save Task</button>
      <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
    </form>
  );
};

export default TaskForm;
