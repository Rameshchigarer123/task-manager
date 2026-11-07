import useTasks from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const { tasks, status, loadTasks, addTask, toggleTask, editTask, deleteTask } =
    useTasks();

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
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </main>
  );
}