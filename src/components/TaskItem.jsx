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
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as done`}
      />

      {isEditing ? (
        <>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
            autoFocus
          />
          <button onClick={saveEditing}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
          {error && <span> {error}</span>}
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </span>
          <button onClick={startEditing}>Edit</button>
        </>
      )}

      <strong> [{task.priority}] </strong>
      <span>{task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}</span>
      {isOverdue && (
        <strong style={{ color: 'red' }}> Overdue</strong>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}