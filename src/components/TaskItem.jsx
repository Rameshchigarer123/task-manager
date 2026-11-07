export default function TaskItem({ task, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as done`}
      />
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>
      <strong> [{task.priority}] </strong>
      <span>{task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}</span>
    </li>
  );
}