import { useState } from 'react';

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [error, setError] = useState('');

  const isOverdue =
    !task.completed && task.dueDate !== null && task.dueDate < getToday();

  function startEditing() {
    setDraft(task.title);
    setError('');
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setError('');
  }

  function saveEditing() {
    if (draft.trim() === '') {
      setError('Title cannot be blank.');
      return;
    }
    onEdit(task.id, draft.trim());
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      saveEditing();
    }
    if (event.key === 'Escape') {
      cancelEditing();
    }
  }

  function handleDelete() {
    const sure = window.confirm(`Delete "${task.title}"?`);
    if (sure) {
      onDelete(task.id);
    }
  }

  return (
    <li className={task.completed ? 'task done' : 'task'}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as done`}
      />

      <div>
        {isEditing ? (
          <>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
              autoFocus
            />
            {error && <p className="error">{error}</p>}
          </>
        ) : (
          <span className="task-title">{task.title}</span>
        )}

        <div className="task-meta">
          <span className={`badge badge-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span>{task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}</span>
          {isOverdue && <span className="overdue">Overdue</span>}
        </div>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={saveEditing}>Save</button>
            <button onClick={cancelEditing}>Cancel</button>
          </>
        ) : (
          <button onClick={startEditing}>Edit</button>
        )}
        <button className="danger" onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}