import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import '../styles.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <button onClick={() => setEditingTask({})}>Add Task</button>
      {editingTask && <TaskForm task={editingTask} setEditingTask={setEditingTask} setTasks={setTasks} />}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong> - {task.status} - {task.dueDate}
            </div>
            <div>
              <button onClick={() => setEditingTask(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
