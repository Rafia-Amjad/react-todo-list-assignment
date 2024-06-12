import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask, editTask }) => {
  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <ul>
      {sortedTasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          toggleTaskCompletion={() => toggleTaskCompletion(index)}
          deleteTask={() => deleteTask(index)}
          editTask={(newText) => editTask(index, newText)}
        />
      ))}
    </ul>
  );
};

export default TaskList;




