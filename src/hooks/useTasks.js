import { useEffect, useState } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');

  function loadTasks() {
    const saved = localStorage.getItem('tasks');

    if (saved) {
      setTasks(JSON.parse(saved));
      setStatus('ready');
      return;
    }

    setStatus('loading');
    fetch('/tasks.json')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
      });
  }

  function addTask(title, priority, dueDate) {
    const newTask = {
      id: Date.now(),
      title: title,
      priority: priority,
      dueDate: dueDate || null,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (status === 'ready') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, status]);

  return { tasks, status, loadTasks, addTask, toggleTask };
}