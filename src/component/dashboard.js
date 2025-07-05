import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from './taskform';
import { TaskFilter } from './taskfilter';
import { TaskList } from './tasklist';

export const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      navigate('/');
    } else {
      setUsername(user);
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(savedTasks);
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="header">
        <h2 className="h2style">Hello, {username} 👋</h2>
        <div>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem('username');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <TaskForm setTasks={setTasks} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList tasks={tasks} setTasks={setTasks} filter={filter} searchTerm={searchTerm} darkMode={darkMode} />
    </div>
  );
};