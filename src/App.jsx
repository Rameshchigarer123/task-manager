import useTasks from './hooks/useTasks';
import TaskForm from './components/TaskForm';

export default function App() {
  const { tasks, status, loadTasks, addTask } = useTasks();

  if (status === 'loading') {
    return <p>Loading tasks…</p>;
  }

  if (status === 'error') {
    return (
      <div>
        <p>Could not load tasks. Please try again.</p>
        <button onClick={loadTasks}>Retry</button>
      </div>
    );
  }

  return (
    <main>
      <h1>Tasks</h1>
      <TaskForm onAdd={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}