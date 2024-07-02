import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TaskDetail() {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Task not found');
        } else {
          console.error(error);
          setError('An error occurred while fetching the task');
        }
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>; }

  if (!task) {
    return <div>Loading...</div>; }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskDetail;
