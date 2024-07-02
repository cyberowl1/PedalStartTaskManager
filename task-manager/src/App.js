import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
