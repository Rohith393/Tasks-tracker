import React from 'react';

export const TaskFilter = ({ filter, setFilter, tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  return (
    <>
    
      <div className="tracker-container">
       
        <div className="tracker-item">Total Tasks: {totalTasks}</div>
        <div className="tracker-item">Completed: {completedTasks}</div>
        <div className="tracker-item">Pending: {pendingTasks}</div>
      </div>

    </>
  );
};