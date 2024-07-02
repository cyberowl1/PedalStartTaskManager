import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/tasks${id}`)
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(response.data.dueDate);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = { title, description, dueDate };
    
    axios.post('http://localhost:5000/api/tasks', task)
      .then(() => navigate('/'))
      .catch(error => console.error('There was an error!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <button type="submit">Save Task</button>
    </form>
  );
}

export default TaskForm;
