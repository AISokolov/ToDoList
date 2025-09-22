import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = "http://localhost:8081/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  };

  // Add a task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      axios.post(API_URL, { title: inputValue, completed: false })
        .then(() => {
          fetchTasks(); // re-fetch tasks from backend
          setInputValue('');
        })
        .catch(error => console.error("Error adding task:", error));
    }
  };

  // Toggle completed
  const toggleTask = (id, completed, title) => {
    axios.put(`${API_URL}/${id}`, { title, completed: !completed })
      .then(() => fetchTasks())
      .catch(error => console.error("Error updating task:", error));
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchTasks())
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Todo List</h1>

        {/* Input section */}
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {/* Task list */}
        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p>No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, task.completed, task.title)}
                />
                <span className="task-title">{task.title}</span>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </header>
    </div>
  );
}

export default App;