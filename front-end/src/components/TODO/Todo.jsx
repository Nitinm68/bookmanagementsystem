// src/components/catalog/Catalog.jsx

import React, { useState } from "react";
import "./todo.css";

const Catalog = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">📝 To-Do List</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="no-task">No tasks yet. Add one! 🚀</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span>{task}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Catalog;
