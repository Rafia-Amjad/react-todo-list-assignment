import React, { useState } from 'react';
import classnames from 'classnames';

const Task = ({ task, toggleTaskCompletion, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewText(task.text);
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <li className={classnames({ completed: task.completed, overdue: isOverdue })}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleTaskCompletion}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <span className={`priority-${task.priority}`}>[{task.priority}]</span>
          {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={deleteTask}>Delete</button>
        </>
      )}
    </li>
  );
};

export default Task;
