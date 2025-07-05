import React, { useState } from 'react';

export const TaskList = ({ tasks, setTasks, filter, searchTerm }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Pending' && !task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleTaskStatus = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updated = tasks.filter(task => task.id !== id);
      setTasks(updated);
    }
  };

  const handleSave = (id) => {
    const updated = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            title: editedTitle,
            description: editedDescription
          }
        : task
    );
    setTasks(updated);
    setEditingTaskId(null);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        filteredTasks.map((task, index) => {
          const colorClass = `task-color-${(index % 5) + 1}`;

          return (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''} ${colorClass}`}
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="task-input"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="task-textarea"
                  />
                </>
              ) : (
                <>
                  <h4 className="task-title">
                    {task.title}
                    {task.completed && <span className="completed-label">(Completed)</span>}
                  </h4>
                  {task.description && <p className="task-description">{task.description}</p>}
                  <p className="task-meta">
                    {task.priority && (
                      <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                    )}
                    {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}
                    {task.createdAt && <span className="task-date">Created: {formatDate(task.createdAt)}</span>}
                  </p>
                </>
              )}

              <div className="task-buttons">
                <button onClick={() => toggleTaskStatus(task.id)}>
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>

                {editingTaskId === task.id ? (
                  <>
                    <button onClick={() => handleSave(task.id)}>Save</button>
                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditedTitle(task.title);
                      setEditedDescription(task.description || '');
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

