import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadTasks, saveTasks } from '../utils/storage';

export function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...taskData,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'Completada' } : t
      )
    );
  };

  return { tasks, addTask, updateTask, deleteTask, completeTask };
}
