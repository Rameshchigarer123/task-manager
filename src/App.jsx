import { useState } from 'react';
import useTasks from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import FilterTabs from './components/FilterTabs';
import Toolbar from './components/Toolbar';
import TaskList from './components/TaskList';

const priorityRank = { High: 0, Medium: 1, Low: 2 };

export default function App() {
  const { tasks, status, loadTasks, addTask, toggleTask, editTask, deleteTask } =
    useTasks();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('none');

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

  let visibleTasks = tasks;

  if (filter === 'active') {
    visibleTasks = visibleTasks.filter((task) => !task.completed);
  }
  if (filter === 'completed') {
    visibleTasks = visibleTasks.filter((task) => task.completed);
  }

  const search = query.trim().toLowerCase();
  visibleTasks = visibleTasks.filter((task) =>
    task.title.toLowerCase().includes(search)
  );

  if (sortBy === 'dueDate') {
    visibleTasks = [...visibleTasks].sort((a, b) => {
      if (a.dueDate === null && b.dueDate === null) return 0;
      if (a.dueDate === null) return 1;
      if (b.dueDate === null) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
  }

  if (sortBy === 'priority') {
    visibleTasks = [...visibleTasks].sort(
      (a, b) => priorityRank[a.priority] - priorityRank[b.priority]
    );
  }

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <main>
      <h1>Tasks</h1>
      <p>
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </p>
      <TaskForm onAdd={addTask} />
      <FilterTabs filter={filter} onChange={setFilter} />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </main>
  );
}