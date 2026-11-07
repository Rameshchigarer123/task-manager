import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add your first task above.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}