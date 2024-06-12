import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import SearchAndFilter from './search';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const upcomingTasks = tasks.filter(task => 
      task.dueDate && task.dueDate === today && !task.completed
    );
    if (upcomingTasks.length > 0) {
      alert(`You have ${upcomingTasks.length} task(s) due today!`);
    }
  }, [tasks]);

  const addTask = (task, priority, dueDate) => {
    setTasks([...tasks, { text: task, completed: false, priority, dueDate }]);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, idx) => idx !== index));
  };

  const editTask = (index, newText) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    return (
      task.text.toLowerCase().includes(searchText.toLowerCase()) &&
      (filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'notCompleted' && !task.completed) ||
        (filter === 'highPriority' && task.priority === 'high') ||
        (filter === 'mediumPriority' && task.priority === 'medium') ||
        (filter === 'lowPriority' && task.priority === 'low'))
    );
  });

  return (
    <div className="app">
      <h1>React To-Do List</h1>
      <TaskInput addTask={addTask} />
      <SearchAndFilter setSearchText={setSearchText} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <button onClick={clearCompletedTasks}>Clear Completed</button>
    </div>
  );
}

export default App;
