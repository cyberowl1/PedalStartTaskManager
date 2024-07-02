// EditTaskForm.js
import React, { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, description, dueDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTaskForm;
