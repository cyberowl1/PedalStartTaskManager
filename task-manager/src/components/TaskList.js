// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditTaskForm from './EditTaskForm';
import '../styles/TaskList.css'; 
// or less ideally
import { Button } from 'react-bootstrap';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = (updatedTask) => {
    axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => (task._id === response.data._id ? response.data : task)));
        setEditingTask(null);
      })
      .catch(error => console.error(error));
  };

  const handleCancel = () => {
    setEditingTask(null);
  };
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <Link type="button" clasName="btn btn-warning" to="/add">Add Task</Link>
      <div className="container bg-primary-subtle">
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link className="h3" to={`/task/${task._id}`}>{task.title}</Link>
            <button className="btn btn-primary" variant="success" onClick={() => handleEdit(task)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingTask && (
        <EditTaskForm task={editingTask} onSave={handleSave} onCancel={handleCancel} />
      )}
      </div>
    </div>
  );
}

export default TaskList;
